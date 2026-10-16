import { PrismaPg } from "@prisma/adapter-pg";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "../generated/prisma/client.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDeviceSimulator, createTelemetryMessageId, type SimulatorClock } from "../server/simulator";
import { createPrismaTelemetryPersistence, createTelemetryIngestionService } from "../server/telemetry/ingestion";
import { registerSimulatorRun, stopSimulatorRun } from "../server/telemetry/run-authority";
import { resolvePermittedLocalTestDatabaseUrl } from "./local-test-database";

const databaseUrl = resolvePermittedLocalTestDatabaseUrl();
const suite = databaseUrl ? describe : describe.skip;

function fixedClock(iso: string): SimulatorClock {
  return { now: () => new Date(iso) };
}

async function holdGenerationAllocatorLock(prisma: PrismaClient): Promise<{
  release: () => void;
  completed: Promise<void>;
}> {
  let markReady!: () => void;
  let releaseLock!: () => void;
  const ready = new Promise<void>((resolve) => { markReady = resolve; });
  const released = new Promise<void>((resolve) => { releaseLock = resolve; });
  const completed = prisma.$transaction(async (tx) => {
    await tx.$queryRaw`
      SELECT current_generation FROM simulator_generation_allocator
      WHERE singleton = TRUE FOR UPDATE
    `;
    markReady();
    await released;
  });
  await ready;
  return { release: releaseLock, completed };
}

async function assertReplacementTelemetryIsFenced(
  prisma: PrismaClient,
  deviceId: string,
  runA: string,
  generationA: number,
  runB: string,
  generationB: number,
): Promise<void> {
  const deviceIndex = Number(deviceId.slice("SIM-".length)) - 1;
  let receiptAt = new Date("2026-10-15T12:10:00.000Z");
  const service = createTelemetryIngestionService(createPrismaTelemetryPersistence(prisma), {
    clock: { now: () => receiptAt },
  });
  const replacementTelemetry = createDeviceSimulator(
    { fleetSize: 3, seed: 11 },
    { clock: fixedClock("2026-10-15T12:00:00.000Z"), runId: runB },
  ).tick()!.telemetry[deviceIndex]!;
  replacementTelemetry.simulator.generation = generationB;
  expect((await service.ingest(replacementTelemetry)).outcome).toBe("persisted");

  const beforeOldTelemetry = await prisma.device.findUniqueOrThrow({ where: { unitId: deviceId } });
  const oldTelemetry = createDeviceSimulator(
    { fleetSize: 3, seed: 11 },
    { clock: fixedClock("2030-01-01T00:00:00.000Z"), runId: runA },
  ).tick()!.telemetry[deviceIndex]!;
  oldTelemetry.simulator.generation = generationA;
  oldTelemetry.sequence = 2;
  oldTelemetry.messageId = createTelemetryMessageId(runA, deviceId, 2);
  receiptAt = new Date("2026-10-15T12:11:00.000Z");
  expect((await service.ingest(oldTelemetry)).reason).toBe("stopped");

  const afterOldTelemetry = await prisma.device.findUniqueOrThrow({ where: { unitId: deviceId } });
  expect(afterOldTelemetry.authorityRunId).toBe(runB);
  expect(afterOldTelemetry.authorityGeneration).toBe(BigInt(generationB));
  expect(afterOldTelemetry.lastSimulatorRunId).toBe(runB);
  expect(afterOldTelemetry.lastTelemetrySequence).toBe(1);
  expect(afterOldTelemetry.lastPingAt).toEqual(beforeOldTelemetry.lastPingAt);
  expect(afterOldTelemetry.lastTelemetryOccurredAt).toEqual(beforeOldTelemetry.lastTelemetryOccurredAt);
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
    let receiptAt = new Date("2026-10-15T12:01:00.000Z");
    const service = createTelemetryIngestionService(persistence, { clock: { now: () => receiptAt } });
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
    const afterFirst = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0001" } });
    expect(afterFirst.lastPingAt.toISOString()).toBe("2026-10-15T12:01:00.000Z");
    expect(afterFirst.lastTelemetryOccurredAt?.toISOString()).toBe("2026-10-15T12:00:00.000Z");
    receiptAt = new Date("2026-10-15T12:02:00.000Z");
    expect((await service.ingest(first)).outcome).toBe("duplicate");
    const afterDuplicate = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0001" } });
    expect(afterDuplicate.lastPingAt.toISOString()).toBe("2026-10-15T12:01:00.000Z");

    const secondRegistration = await registerSimulatorRun(runTwo, targetIds, prisma);
    expect(secondRegistration.generation).toBeGreaterThan(firstRegistration.generation);
    const restarted = createDeviceSimulator({ fleetSize: 1, seed: 10 }, { clock: fixedClock("2026-10-15T11:59:00.000Z"), runId: runTwo }).tick()!.telemetry[0]!;
    restarted.simulator.generation = secondRegistration.generation;
    expect(restarted.messageId).not.toBe(first.messageId);
    receiptAt = new Date("2026-10-15T12:03:00.000Z");
    expect((await service.ingest(restarted)).outcome).toBe("persisted");
    const afterRestart = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0001" } });
    expect(afterRestart.lastPingAt.toISOString()).toBe("2026-10-15T12:03:00.000Z");
    expect(afterRestart.lastTelemetryOccurredAt?.toISOString()).toBe("2026-10-15T11:59:00.000Z");
    const delayedOldRun = { ...first, occurredAt: "2030-01-01T00:00:00.000Z", sequence: 2 };
    delayedOldRun.messageId = createTelemetryMessageId(runOne, "SIM-0001", 2);
    receiptAt = new Date("2026-10-15T12:04:00.000Z");
    expect((await service.ingest(delayedOldRun)).reason).toBe("superseded");

    const row = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0001" } });
    expect(row.lastSimulatorRunId).toBe(runTwo);
    expect(row.lastTelemetrySequence).toBe(1);
    expect(row.lastMessageId).toBe(restarted.messageId);
    expect(row.lastPingAt.toISOString()).toBe("2026-10-15T12:03:00.000Z");
    expect(row.lastTelemetryOccurredAt?.toISOString()).toBe("2026-10-15T11:59:00.000Z");
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
    const sequenceTwo = { ...telemetry, sequence: 2, messageId: createTelemetryMessageId(winner.runId, "SIM-0002", 2), occurredAt: "2026-10-15T12:00:05.000Z" };
    const sequenceThree = { ...telemetry, sequence: 3, messageId: createTelemetryMessageId(winner.runId, "SIM-0002", 3), occurredAt: "2026-10-15T12:00:10.000Z" };
    const service = createTelemetryIngestionService(createPrismaTelemetryPersistence(prisma));
    const outcomes = await Promise.all([service.ingest(sequenceTwo), service.ingest(sequenceThree)]);
    expect(outcomes.filter(({ persisted }) => persisted).length).toBeGreaterThanOrEqual(1);
    expect((await service.ingest({ ...sequenceThree, simulator: { ...sequenceThree.simulator, runId: loser } })).reason).toBe("superseded");
    const final = await prisma.device.findUniqueOrThrow({ where: { unitId: "SIM-0002" } });
    expect(final.lastTelemetrySequence).toBe(3);
    expect(final.lastSimulatorRunId).toBe(winner.runId);

    const contenderRunId = `race-replacement-${randomUUID()}`;
    const contenderTick = createDeviceSimulator({ fleetSize: 2, seed: 4 }, { clock: fixedClock("2026-10-15T12:01:00.000Z"), runId: winner.runId }).tick()!;
    const racingOldMessage = { ...contenderTick.telemetry[1]!, sequence: 4, messageId: createTelemetryMessageId(winner.runId, "SIM-0002", 4) };
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

  it("preserves replacement authority when stop commits before registration", async () => {
    const deviceId = "SIM-0003";
    const runA = `stop-race-a-${randomUUID()}`;
    const runB = `stop-race-b-${randomUUID()}`;
    const registrationA = await registerSimulatorRun(runA, [deviceId], prisma);
    const allocatorLock = await holdGenerationAllocatorLock(prisma);
    let registrationBPromise: Promise<Awaited<ReturnType<typeof registerSimulatorRun>>> | undefined;

    try {
      registrationBPromise = registerSimulatorRun(runB, [deviceId], prisma);
      await stopSimulatorRun(runA, prisma);
      allocatorLock.release();
      const registrationB = await registrationBPromise;

      const stoppedRun = await prisma.simulatorRun.findUniqueOrThrow({ where: { runId: runA } });
      const activeRun = await prisma.simulatorRun.findUniqueOrThrow({ where: { runId: runB } });
      expect(stoppedRun.status).toBe("STOPPED");
      expect(activeRun.status).toBe("ACTIVE");
      const device = await prisma.device.findUniqueOrThrow({ where: { unitId: deviceId } });
      expect(device.authorityRunId).toBe(runB);
      expect(device.authorityGeneration).toBe(BigInt(registrationB.generation));
      await assertReplacementTelemetryIsFenced(prisma, deviceId, runA, registrationA.generation, runB, registrationB.generation);
    } finally {
      allocatorLock.release();
      await allocatorLock.completed;
      if (registrationBPromise) await registrationBPromise.catch(() => undefined);
    }
  });

  it("preserves replacement authority when registration commits before stop", async () => {
    const deviceId = "SIM-0002";
    const runA = `replacement-first-a-${randomUUID()}`;
    const runB = `replacement-first-b-${randomUUID()}`;
    const registrationA = await registerSimulatorRun(runA, [deviceId], prisma);
    const registrationB = await registerSimulatorRun(runB, [deviceId], prisma);
    await stopSimulatorRun(runA, prisma);

    const stoppedRun = await prisma.simulatorRun.findUniqueOrThrow({ where: { runId: runA } });
    const activeRun = await prisma.simulatorRun.findUniqueOrThrow({ where: { runId: runB } });
    expect(stoppedRun.status).toBe("STOPPED");
    expect(activeRun.status).toBe("ACTIVE");
    const device = await prisma.device.findUniqueOrThrow({ where: { unitId: deviceId } });
    expect(device.authorityRunId).toBe(runB);
    expect(device.authorityGeneration).toBe(BigInt(registrationB.generation));
    await assertReplacementTelemetryIsFenced(prisma, deviceId, runA, registrationA.generation, runB, registrationB.generation);
  });

  it("rolls back a registration when any target identity is unknown", async () => {
    const runId = `unknown-target-${randomUUID()}`;
    const generationBefore = (await prisma.simulatorGenerationAllocator.findUniqueOrThrow({ where: { singleton: true } })).currentGeneration;
    await expect(registerSimulatorRun(runId, ["SIM-0001", "SIM-NOT-REGISTERED"], prisma)).rejects.toThrow("unknown-target-device");
    expect(await prisma.simulatorRun.findUnique({ where: { runId } })).toBeNull();
    expect((await prisma.simulatorGenerationAllocator.findUniqueOrThrow({ where: { singleton: true } })).currentGeneration).toBe(generationBefore);
  });
});
