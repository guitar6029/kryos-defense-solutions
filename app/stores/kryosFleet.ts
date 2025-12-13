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
const initialFleet: KryosNode[] = [];

export const useKryosFleetStore = defineStore("kryosFleet", () => {
  const fleet = ref<KryosNode[]>(initialFleet);

  function ingestPing(unitId: string, payload: unknown) {}

  function flagDegraded(unitId: string, reason: Reason) {}

  function assignZone(unitId: string, zone: Zone) {}

  function scheduleMaintenance(unitId: string) {}

  return { ingestPing, flagDegraded, assignZone, scheduleMaintenance, fleet };
});
