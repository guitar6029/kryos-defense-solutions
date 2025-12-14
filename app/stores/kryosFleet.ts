import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Platform } from "~/types/Platform";
import type { Reason } from "~/types/Reason";
import type { Role } from "~/types/Role";
import type { LinkState } from "~/types/LinkState";
import type { Status } from "~/types/Status";
import type { Zone } from "~/types/Zone";

export type KryosNode = {
  unitId: string;
  platform: Platform;
  status: Status;
  zone: Zone;
  powerPct: number;
  link: LinkState;
  lastPingmsAgo: number;
  role: Role;
};

//initial fleeet data
const initialFleet: KryosNode[] = [
  {
    unitId: "MK-1A",
    platform: "MK",
    status: "ONLINE",
    zone: "ALPHA",
    powerPct: 82,
    link: { status: "STABLE", signalQuality: 92 },
    lastPingmsAgo: 120,
    role: "SCOUT",
  },
  {
    unitId: "MK-1B",
    platform: "MK",
    status: "ONLINE",
    zone: "ALPHA",
    powerPct: 67,
    link: { status: "STABLE", signalQuality: 88 },
    lastPingmsAgo: 240,
    role: "GUARD",
  },
  {
    unitId: "MK-1C",
    platform: "MK",
    status: "DEGRADED",
    zone: "BRAVO",
    powerPct: 41,
    link: { status: "WEAK", signalQuality: 46 },
    lastPingmsAgo: 980,
    role: "SCOUT",
  },
  {
    unitId: "EX-1A",
    platform: "EX",
    status: "ONLINE",
    zone: "CHARLIE",
    powerPct: 74,
    link: { status: "STABLE", signalQuality: 90 },
    lastPingmsAgo: 180,
    role: "SUPPORT",
  },
  {
    unitId: "EX-1B",
    platform: "EX",
    status: "MAINTENANCE",
    zone: "DELTA",
    powerPct: 100,
    link: { status: "LOST", signalQuality: 0 },
    lastPingmsAgo: 12_000,
    role: "HAUL",
  },
  {
    unitId: "MK-1D",
    platform: "MK",
    status: "OFFLINE",
    zone: "BRAVO",
    powerPct: 0,
    link: { status: "LOST", signalQuality: 0 },
    lastPingmsAgo: 45_000,
    role: "GUARD",
  },
  {
    unitId: "EX-1C",
    platform: "EX",
    status: "ONLINE",
    zone: "ALPHA",
    powerPct: 59,
    link: { status: "WEAK", signalQuality: 55 },
    lastPingmsAgo: 420,
    role: "SUPPORT",
  },
];

export const useKryosFleetStore = defineStore("kryosFleet", () => {
  const fleet = ref<KryosNode[]>(initialFleet);

  function ingestPing(unitId: string, payload: unknown) {}

  function flagDegraded(unitId: string, reason: Reason) {}

  function assignZone(unitId: string, zone: Zone) {}

  function scheduleMaintenance(unitId: string) {}

  const totalDegraded = computed(() => {
    return fleet.value.filter((node: KryosNode) => node.status === "DEGRADED")
      .length;
  });

  const totalOnline = computed(() => {
    return fleet.value.filter((node: KryosNode) => node.status === "ONLINE")
      .length;
  });
  const totalOffline = computed(() => {
    return fleet.value.filter((node: KryosNode) => node.status === "OFFLINE")
      .length;
  });
  const totalMaintenance = computed(() => {
    return fleet.value.filter(
      (fleet: KryosNode) => fleet.status === "MAINTENANCE"
    ).length;
  });

  const averagePowerTotal = computed(() => {
    const totalFleet = fleet.value.length;

    if (totalFleet === 0) return 0;

    const totalFleetPower = fleet.value.reduce(
      (accum, node) => accum + node.powerPct,
      0
    );
    return totalFleetPower / totalFleet;
  });

  const avgPowerOnlineTotal = computed(() => {
    const onlineNodes = fleet.value.filter(
      (node: KryosNode) => node.status === "ONLINE"
    );

    if (onlineNodes.length === 0) return 0;

    const totalPowerForOnlineNodes = onlineNodes.reduce(
      (accum, node) => accum + node.powerPct,
      0
    );

    return totalPowerForOnlineNodes / onlineNodes.length;
  });

  return {
    assignZone,
    averagePowerTotal,
    avgPowerOnlineTotal,
    flagDegraded,
    fleet,
    ingestPing,
    scheduleMaintenance,
    totalDegraded,
    totalMaintenance,
    totalOffline,
    totalOnline,
  };
});
