import { PrismaPg } from "@prisma/adapter-pg";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "../generated/prisma/client.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDeviceSimulator, type SimulatorClock } from "../server/simulator";
import { createPrismaTelemetryPersistence, createTelemetryIngestionService } from "../server/telemetry/ingestion";
import { registerSimulatorRun, stopSimulatorRun } from "../server/telemetry/run-authority";
import { resolvePermittedLocalTestDatabaseUrl } from "./local-test-database";

const databaseUrl = resolvePermittedLocalTestDatabaseUrl();
const suite = databaseUrl ? describe : describe.skip;

function fixedClock(iso: string): SimulatorClock {
  return { now: () => new Date(iso) };
}

suite("telemetry persistence (local PostgreSQL)", () => {
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl! }) });

  beforeAll(async () => {
    for (let index = 1; index <= 3; index += 1) {
      const unitId = `SIM-${String(index).padStart(4, "0")}`;
      await prisma.device.upsert({
        where: { unitId },
        create: {
          unitId,
          platform: index % 2 ? "MK" : "EX",
          status: "ONLINE",
          zone: "ALPHA",
          powerPct: 80,
          linkStatus: "STABLE",
          signalQuality: 90,
          lastPingAt: new Date("2026-10-15T11:00:00.000Z"),
          role: "SCOUT",
        },
        update: {
          platform: index % 2 ? "MK" : "EX",
          status: "ONLINE",
          zone: "ALPHA",
          powerPct: 80,
          linkStatus: "STABLE",
          signalQuality: 90,
          lastPingAt: new Date("2026-10-15T11:00:00.000Z"),
          role: "SCOUT",
        },
      });
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("assigns generations idempotently, fences superseded runs, and preserves same-run sequence ordering", async () => {
    const persistence = createPrismaTelemetryPersistence(prisma);
    const service = createTelemetryIngestionService(persistence);
    const runOne = `run-one-${randomUUID()}`;
    const runTwo = `run-two-${randomUUID()}`;
    const targetIds = ["SIM-0001"];
    const firstRegistration = await registerSimulatorRun(runOne, targetIds, prisma);
    const [firstRetry, concurrentRetry] = await Promise.all([
      registerSimulatorRun(runOne, targetIds, prisma),
      registerSimulatorRun(runOne, [...targetIds], prisma),
    ]);
    expect(firstRetry.generation).toBe(firstRegistration.generation);
    expect(concurrentRetry.generation).toBe(firstRegistration.generation);
    expect(firstRetry.targetDeviceIds).toEqual(targetIds);
    await expect(registerSimulatorRun(runOne, ["SIM-0001", "SIM-0002"], prisma)).rejects.toThrow("run-id-target-mismatch");

    const first = createDeviceSimulator({ fleetSize: 1, seed: 10 }, { clock: fixedClock("2026-10-15T12:00:00.000Z"), runId: runOne }).tick()!.telemetry[0]!;
    first.simulator.generation = firstRegistration.generation;
    expect((await service.ingest(first)).outcome).toBe("persisted");
    expect((await service.ingest(first)).outcome).toBe("duplicate");

    const secondRegistration = await registerSimulatorRun(runTwo, targetIds, prisma);
    expect(secondRegistration.generation).toBeGreaterThan(firstRegistration.generation);
    const restarted = createDeviceSimulator({ fleetSize: 1, seed: 10 }, { clock: fixedClock("2026-10-15T11:59:00.000Z"), runId: runTwo }).tick()!.telemetry[0]!;
    restarted.simulator.generation = secondRegistration.generation;
    expect(restarted.messageId).not.toBe(first.messageId);
    expect((await service.ingest(restarted)).outcome).toBe("persisted");
    const delayedOldRun = { ...first, occurredAt: "2030-01-01T00:00:00.000Z", sequence: 2 };
    delayedOldRun.messageId = `${runOne}/SIM-0001/000002`;
    expect((await service.ingest(delayedOldRun)).reason).toBe("superseded");

    const row = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0001" } });
    expect(row.lastSimulatorRunId).toBe(runTwo);
    expect(row.lastTelemetrySequence).toBe(1);
    expect(row.lastMessageId).toBe(restarted.messageId);
    expect(row.lastPingAt.toISOString()).toBe("2026-10-15T11:59:00.000Z");
    expect(row.authorityRunId).toBe(runTwo);
    expect(row.authorityGeneration).toBe(BigInt(secondRegistration.generation));
  });

  it("serializes concurrent registrations and same-run telemetry updates", async () => {
    const runA = `concurrent-a-${randomUUID()}`;
    const runB = `concurrent-b-${randomUUID()}`;
    const [registrationA, registrationB] = await Promise.all([
      registerSimulatorRun(runA, ["SIM-0002"], prisma),
      registerSimulatorRun(runB, ["SIM-0002"], prisma),
    ]);
    const winner = registrationA.generation > registrationB.generation ? registrationA : registrationB;
    const loser = winner.runId === runA ? runB : runA;
    const authority = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0002" } });
    expect(authority.authorityRunId).toBe(winner.runId);
    expect(authority.authorityGeneration).toBe(BigInt(winner.generation));

    const simulator = createDeviceSimulator({ fleetSize: 2, seed: 4 }, { clock: fixedClock("2026-10-15T12:00:00.000Z"), runId: winner.runId });
    const firstTick = simulator.tick()!;
    const telemetry = firstTick.telemetry[1]!;
    telemetry.simulator.generation = winner.generation;
    const sequenceTwo = { ...telemetry, sequence: 2, messageId: `${winner.runId}/SIM-0002/000002`, occurredAt: "2026-10-15T12:00:05.000Z" };
    const sequenceThree = { ...telemetry, sequence: 3, messageId: `${winner.runId}/SIM-0002/000003`, occurredAt: "2026-10-15T12:00:10.000Z" };
    const service = createTelemetryIngestionService(createPrismaTelemetryPersistence(prisma));
    const outcomes = await Promise.all([service.ingest(sequenceTwo), service.ingest(sequenceThree)]);
    expect(outcomes.filter(({ persisted }) => persisted).length).toBeGreaterThanOrEqual(1);
    expect((await service.ingest({ ...sequenceThree, simulator: { ...sequenceThree.simulator, runId: loser } })).reason).toBe("superseded");
    const final = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0002" } });
    expect(final.lastTelemetrySequence).toBe(3);
    expect(final.lastSimulatorRunId).toBe(winner.runId);

    const contenderRunId = `race-replacement-${randomUUID()}`;
    const contenderTick = createDeviceSimulator({ fleetSize: 2, seed: 4 }, { clock: fixedClock("2026-10-15T12:01:00.000Z"), runId: winner.runId }).tick()!;
    const racingOldMessage = { ...contenderTick.telemetry[1]!, sequence: 4, messageId: `${winner.runId}/SIM-0002/000004` };
    racingOldMessage.simulator.generation = winner.generation;
    const [raceResult, replacement] = await Promise.all([
      service.ingest(racingOldMessage),
      registerSimulatorRun(contenderRunId, ["SIM-0002"], prisma),
    ]);
    expect(["persisted", "rejected"]).toContain(raceResult.outcome);
    expect(replacement.generation).toBeGreaterThan(winner.generation);
    const afterReplacement = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0002" } });
    expect(afterReplacement.authorityRunId).toBe(contenderRunId);
    expect((await service.ingest(racingOldMessage)).reason).toBe("superseded");
    const afterDelayedRetry = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0002" } });
    expect(afterDelayedRetry.lastTelemetrySequence).toBe(afterReplacement.lastTelemetrySequence);
    expect(afterDelayedRetry.lastMessageId).toBe(afterReplacement.lastMessageId);
  });

  it("revokes authority on stop and rejects telemetry from a stopped run", async () => {
    const runId = `stopped-${randomUUID()}`;
    const registration = await registerSimulatorRun(runId, ["SIM-0003"], prisma);
    await stopSimulatorRun(runId, prisma);
    await expect(registerSimulatorRun(runId, ["SIM-0003"], prisma)).rejects.toThrow("stopped-run");
    const telemetry = createDeviceSimulator({ fleetSize: 3, seed: 9 }, { clock: fixedClock("2026-10-15T12:00:00.000Z"), runId }).tick()!.telemetry[2]!;
    telemetry.simulator.generation = registration.generation;
    const service = createTelemetryIngestionService(createPrismaTelemetryPersistence(prisma));
    expect((await service.ingest(telemetry)).reason).toBe("stopped");
    const device = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0003" } });
    expect(device.authorityRunId).toBeNull();
    expect(device.authorityGeneration).toBeNull();
    expect((await prisma.simulatorRun.findUniqueOrThrow({ where: { runId } })).status).toBe("STOPPED");
  });

  it("rolls back a registration when any target identity is unknown", async () => {
    const runId = `unknown-target-${randomUUID()}`;
    const generationBefore = (await prisma.simulatorGenerationAllocator.findUniqueOrThrow({ where: { singleton: true } })).currentGeneration;
    await expect(registerSimulatorRun(runId, ["SIM-0001", "SIM-NOT-REGISTERED"], prisma)).rejects.toThrow("unknown-target-device");
    expect(await prisma.simulatorRun.findUnique({ where: { runId } })).toBeNull();
    expect((await prisma.simulatorGenerationAllocator.findUniqueOrThrow({ where: { singleton: true } })).currentGeneration).toBe(generationBefore);
  });
});
