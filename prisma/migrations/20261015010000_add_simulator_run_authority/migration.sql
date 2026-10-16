CREATE TABLE "simulator_generation_allocator" (
    "singleton" BOOLEAN NOT NULL DEFAULT TRUE,
    "current_generation" BIGINT NOT NULL DEFAULT 0,
    CONSTRAINT "simulator_generation_allocator_pkey" PRIMARY KEY ("singleton"),
    CONSTRAINT "simulator_generation_allocator_singleton_check" CHECK ("singleton" = TRUE),
    CONSTRAINT "simulator_generation_allocator_generation_check" CHECK ("current_generation" >= 0)
);

-- Allocation is serialized by updating this initialized singleton row in each registration transaction.
INSERT INTO "simulator_generation_allocator" ("singleton", "current_generation") VALUES (TRUE, 0);

CREATE TABLE "simulator_runs" (
    "run_id" TEXT NOT NULL,
    "generation" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "target_device_ids" TEXT[] NOT NULL,
    "target_hash" TEXT NOT NULL,
    "started_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stopped_at" TIMESTAMPTZ(6),
    CONSTRAINT "simulator_runs_pkey" PRIMARY KEY ("run_id"),
    CONSTRAINT "simulator_runs_generation_key" UNIQUE ("generation"),
    CONSTRAINT "simulator_runs_generation_check" CHECK ("generation" > 0),
    CONSTRAINT "simulator_runs_status_check" CHECK ("status" IN ('ACTIVE', 'STOPPED')),
    CONSTRAINT "simulator_runs_stopped_at_check" CHECK (("status" = 'ACTIVE' AND "stopped_at" IS NULL) OR ("status" = 'STOPPED' AND "stopped_at" IS NOT NULL)),
    CONSTRAINT "simulator_runs_targets_nonempty_check" CHECK (cardinality("target_device_ids") > 0)
);

ALTER TABLE "devices"
    ADD COLUMN "authority_run_id" TEXT,
    ADD COLUMN "authority_generation" BIGINT,
    ADD CONSTRAINT "devices_authority_pair_check" CHECK (("authority_run_id" IS NULL AND "authority_generation" IS NULL) OR ("authority_run_id" IS NOT NULL AND "authority_generation" IS NOT NULL AND "authority_generation" > 0)),
    ADD CONSTRAINT "devices_authority_run_fkey" FOREIGN KEY ("authority_run_id") REFERENCES "simulator_runs" ("run_id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "devices_authority_run_id_idx" ON "devices" ("authority_run_id");
