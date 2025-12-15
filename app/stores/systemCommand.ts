import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Command } from "~/types/Command";

export const useSystemCommandStore = defineStore("systemCommand", () => {
  const queue = ref<Command[]>([]);
  const history = ref<Command[]>([]);
  const activeId = ref<string | null>(null);

  const getQueued = computed(() => {
    return queue.value.filter((c: Command) => c.status === "queued");
  });

  const getActive = computed(() => {
    return queue.value.find((c: Command) => c.id === activeId.value) ?? null;
  });

  const queuedCount = computed(() => {
    return queue.value.filter((c: Command) => c.status === "queued").length;
  });

  const failedCount = computed(() => {
    return history.value.filter((c: Command) => c.status === "failed").length;
  });

  const lastAckMsAgo = computed(() => {
    const ackedOnly =
      history.value?.filter((c: Command) => c.status === "acked") ?? [];
    if (ackedOnly.length === 0) {
      return 0;
    }

    let max = 0;
    for (let i = 0; i < ackedOnly.length; ) {
      const ackedCurVal = ackedOnly[i]?.ackedAt ?? 0;
      if (ackedCurVal > max) {
        max = ackedCurVal;
      }
      i++;
    }

    const calculated = Date.now() - max;
    return calculated;
  });

  return { getQueued, getActive, failedCount, queuedCount, lastAckMsAgo };
});
