import { createHash } from "node:crypto";
import type { PrismaClient } from "../../generated/prisma/client.js";
import { getPrismaClient } from "../utils/prisma";

export type RunRegistration = { runId: string; generation: number; targetDeviceIds: string[]; status: "ACTIVE" | "STOPPED" };

export class RunRegistrationError extends Error {
  constructor(message: "empty-target-set" | "run-id-target-mismatch" | "stopped-run" | "unknown-target-device") {
    super(message);
    this.name = "RunRegistrationError";
  }
}

function canonicalTargets(targetDeviceIds: string[]): string[] {
  if (targetDeviceIds.length === 0 || targetDeviceIds.some((id) => typeof id !== "string" || !id.trim())) {
    throw new RunRegistrationError("empty-target-set");
  }
  const targets = [...targetDeviceIds].sort();
  if (new Set(targets).size !== targets.length) throw new RunRegistrationError("empty-target-set");
  return targets;
}

function targetHash(targets: string[]): string {
  return createHash("sha256").update(JSON.stringify(targets)).digest("hex");
}

/**
 * Registration increments the singleton allocator and replaces all target
 * authorities in the same transaction. Allocator row locks serialize both.
 */
export async function registerSimulatorRun(
  runId: string,
  targetDeviceIds: string[],
  prisma: PrismaClient = getPrismaClient(),
): Promise<RunRegistration> {
  if (!runId || runId.length > 128) throw new RunRegistrationError("run-id-target-mismatch");
  const targets = canonicalTargets(targetDeviceIds);
  const hash = targetHash(targets);

  return prisma.$transaction(async (tx) => {
    // UPDATE obtains a row lock held until commit, serializing allocations and the authority writes below.
    const [lockedAllocator] = await tx.$queryRaw<Array<{ current_generation: bigint }>>`
      SELECT current_generation FROM simulator_generation_allocator
      WHERE singleton = TRUE FOR UPDATE
    `;
    if (!lockedAllocator) throw new Error("Simulator generation allocator is not initialized.");

    const existing = await tx.simulatorRun.findUnique({ where: { runId } });
    if (existing) {
      if (existing.targetHash !== hash || JSON.stringify(existing.targetDeviceIds) !== JSON.stringify(targets)) {
        throw new RunRegistrationError("run-id-target-mismatch");
      }
      if (existing.status !== "ACTIVE") throw new RunRegistrationError("stopped-run");
      return {
        runId,
        generation: Number(existing.generation),
        targetDeviceIds: targets,
        status: "ACTIVE",
      };
    }

    const allocator = await tx.simulatorGenerationAllocator.update({
      where: { singleton: true },
      data: { currentGeneration: { increment: 1n } },
      select: { currentGeneration: true },
    });
    const found = await tx.device.findMany({ where: { unitId: { in: targets } }, select: { unitId: true } });
    if (found.length !== targets.length) throw new RunRegistrationError("unknown-target-device");

    const generation = allocator.currentGeneration;
    if (!Number.isSafeInteger(Number(generation))) throw new Error("Simulator generation exceeds the supported safe integer range.");
    await tx.simulatorRun.create({
      data: { runId, generation, status: "ACTIVE", targetDeviceIds: targets, targetHash: hash },
    });
    const replaced = await tx.device.updateMany({
      where: { unitId: { in: targets } },
      data: { authorityRunId: runId, authorityGeneration: generation },
    });
    if (replaced.count !== targets.length) throw new RunRegistrationError("unknown-target-device");

    return { runId, generation: Number(generation), targetDeviceIds: targets, status: "ACTIVE" };
  });
}

/** Stop is idempotent. It releases only devices still controlled by this run. */
export async function stopSimulatorRun(
  runId: string,
  prisma: PrismaClient = getPrismaClient(),
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const run = await tx.simulatorRun.findUnique({ where: { runId } });
    if (!run || run.status === "STOPPED") return;
    await tx.simulatorRun.update({
      where: { runId },
      data: { status: "STOPPED", stoppedAt: new Date() },
    });
    await tx.device.updateMany({
      where: { authorityRunId: runId, authorityGeneration: run.generation },
      data: { authorityRunId: null, authorityGeneration: null },
    });
  });
}
