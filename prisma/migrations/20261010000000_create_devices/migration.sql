-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "devices" (
    "unit_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "power_pct" SMALLINT NOT NULL,
    "link_status" TEXT NOT NULL,
    "signal_quality" SMALLINT NOT NULL,
    "last_ping_at" TIMESTAMPTZ(6) NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("unit_id")
);

-- CHECK constraints are currently expressed in migration SQL because Prisma Schema Language has no native CHECK syntax.
ALTER TABLE "devices"
    ADD CONSTRAINT "devices_platform_check" CHECK ("platform" IN ('MK', 'EX')),
    ADD CONSTRAINT "devices_status_check" CHECK ("status" IN ('ONLINE', 'OFFLINE', 'MAINTENANCE', 'DEGRADED')),
    ADD CONSTRAINT "devices_zone_check" CHECK ("zone" IN ('ALPHA', 'BRAVO', 'CHARLIE', 'DELTA')),
    ADD CONSTRAINT "devices_power_pct_check" CHECK ("power_pct" BETWEEN 0 AND 100),
    ADD CONSTRAINT "devices_link_status_check" CHECK ("link_status" IN ('STABLE', 'WEAK', 'LOST')),
    ADD CONSTRAINT "devices_signal_quality_check" CHECK ("signal_quality" BETWEEN 0 AND 100),
    ADD CONSTRAINT "devices_role_check" CHECK ("role" IN ('SCOUT', 'SUPPORT', 'GUARD', 'HAUL'));
