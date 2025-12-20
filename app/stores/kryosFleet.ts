import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CommandFailReason } from "~/types/CommandFailReason";
import type { Zone } from "~/types/Zone";
import type { KryosNode } from "~/types/KryosNode";

export const useKryosFleetStore = defineStore("kryosFleet", () => {
  const fleet = ref<KryosNode[]>([]);

  function ingestPing(unitId: string, payload: unknown) {}

  function flagDegraded(unitId: string, reason: CommandFailReason) {}

  function assignZone(unitId: string, zone: Zone) {}

  function scheduleMaintenance(unitId: string) {}

  const setFleet = (data: KryosNode[]): void => {
    fleet.value = data
  }

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
      (node: KryosNode) => node.status === "MAINTENANCE"
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

  const stats = computed(() => ({
    totalOnline: totalOnline.value,
    totalOffline: totalOffline.value,
    totalDegraded: totalDegraded.value,
    totalMaintenance: totalMaintenance.value,
    avgPower: averagePowerTotal.value,
    avgPowerOnline: avgPowerOnlineTotal.value,
  }));

  return {
    assignZone,
    flagDegraded,
    fleet,
    ingestPing,
    scheduleMaintenance,
    setFleet,
    stats,
  };
});
