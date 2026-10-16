-- Preserve the fleet projection while adding the simulator's latest operational state.
ALTER TABLE "devices"
    ADD COLUMN "health" TEXT NOT NULL DEFAULT 'HEALTHY',
    ADD COLUMN "availability" TEXT NOT NULL DEFAULT 'AVAILABLE',
    ADD COLUMN "charging" TEXT NOT NULL DEFAULT 'NOT_CHARGING',
    ADD COLUMN "assignment_id" TEXT,
    ADD COLUMN "fault_code" TEXT,
    ADD COLUMN "last_message_id" TEXT,
    ADD COLUMN "last_simulator_run_id" TEXT,
    ADD COLUMN "last_telemetry_sequence" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "devices"
    ADD CONSTRAINT "devices_health_check" CHECK ("health" IN ('HEALTHY', 'FAULTED')),
    ADD CONSTRAINT "devices_availability_check" CHECK ("availability" IN ('AVAILABLE', 'ASSIGNED')),
    ADD CONSTRAINT "devices_charging_check" CHECK ("charging" IN ('NOT_CHARGING', 'CHARGING')),
    ADD CONSTRAINT "devices_last_telemetry_sequence_check" CHECK ("last_telemetry_sequence" >= 0);
