<script lang="ts" setup>
import { ref } from "vue";
import { useKryosFleetStore, type KryosNode } from "#imports";
import KryosButton from "./Command/KryosButton.vue";
import KryosLabel from "../Labels/KryosLabel.vue";
import KryosPanelTitle from "../Labels/KryosPanelTitle.vue";
import type { CommandType } from "~/types/Command";

const kryosFleetStore = useKryosFleetStore();
const selectedType = ref<CommandType | null>(null);
const targetSearchRaw = ref<string | null>(null);
const selectedNode = ref<KryosNode | null>(null);

type ModeOptions = "HOLD" | "PATROL" | "RTB";

const modeOptions: ModeOptions[] = ["HOLD", "PATROL", "RTB"];

const setModeSelector = ref<ModeOptions | null>("HOLD");

const handleSelectedNode = (node: KryosNode) => {
  selectedNode.value = node;
};

const setSelectedType = (selected: CommandType) => {
  selectedType.value = selected;
};

function getActiveBorder(command: CommandType) {
  if (command === selectedType.value) {
    return "var(--kryos-text-mid)";
  } else {
    return "var(--kryos-accent)";
  }
}

const filteredFleet = computed(() => {
  const input = targetUppercaseFormat.value;
  //if input is null
  if (!input || input.length < 2) {
    return [];
  } else {
    // filter with the input
    return kryosFleetStore.fleet.filter((node: KryosNode) =>
      node.unitId.includes(input)
    );
  }
});

const isFilteredFleetSearchEmpty = computed(() => {
  return filteredFleet.value.length === 0;
});

const targetUppercaseFormat = computed({
  get: () => targetSearchRaw.value?.toUpperCase(),
  set: (val: string) => {
    targetSearchRaw.value = val.toUpperCase() ?? "";
  },
});

const clearSelected = () => {
  targetSearchRaw.value = null;
  selectedNode.value = null;
};

const compiledPreview = computed(() => {
  if (!selectedType.value) {
    return "Select Command Type";
  } else if (selectedType.value && !selectedNode.value) {
    return `Armed: ${selectedType.value} // Target: --`;
  } else {
    return `Ready: ${selectedType.value} // ${selectedNode.value?.unitId}`;
  }
});

const isSelectedCommandSetMode = computed(() => {
  return selectedType.value === "SET_MODE";
});

const commandReadyToRequest = computed(() => {
  //if no comand queue is selected
  if (!selectedType.value) {
    return false;
  } else if (
    isSelectedCommandSetMode.value &&
    selectedNode.value &&
    setModeSelector.value
  ) {
    return true;
  } else {
    return selectedType.value && selectedNode.value;
  }
});

function handleCommandRequest() {}
</script>

<template>
  <div class="flex flex-col gap-6 p-4 kryos-border">
    <KryosPanelTitle title="Command queue" />
    <div class="flex flex-row items-center gap-2">
      <KryosButton
        :style="{
          borderColor: getActiveBorder('PING'),
          borderWidth: '2px',
        }"
        label="ping"
        @click="setSelectedType('PING')"
      />
      <KryosButton
        :style="{
          borderColor: getActiveBorder('RECALL'),
          borderWidth: '2px',
        }"
        label="recall"
        @click="setSelectedType('RECALL')"
      />
      <KryosButton
        :style="{
          borderColor: getActiveBorder('SET_MODE'),
          borderWidth: '2px',
        }"
        label="set mode"
        @click="setSelectedType('SET_MODE')"
      />
    </div>
    <div class="uppercase kryos-text">{{ compiledPreview }}</div>
  </div>

  <!-- selected type and not selected node -->
  <div
    v-if="selectedType && !selectedNode"
    class="flex flex-col gap-6 p-4 kryos-border"
  >
    <KryosPanelTitle title="target" />
    <div class="flex flex-col gap-1">
      <KryosLabel labelText="search nodes" />
      <input
        type="text"
        name="targetSearchRaw"
        v-model="targetSearchRaw"
        class="h-10 p-4 w-120 border uppercase"
      />
    </div>

    <span v-if="isFilteredFleetSearchEmpty" class="text-[0.8rem] uppercase"
      >[no matches // check link]</span
    >
    <div v-else class="flex flex-col gap-2">
      <div
        v-for="node in filteredFleet"
        :key="node.unitId"
        @click="handleSelectedNode(node)"
        class="flex font-mono min-w-100 max-w-120 text-[1.5rem] flex-row items-center gap-2 border trns hover:bg-(--kryos-bg-alt) hover:text-(--kryos-text-high) cursor-default p-4"
      >
        <div class="flex flex-row items-center gap-2">
          <span>{{ node.unitId }}</span>
          <span>/ {{ node.platform }}</span>
          <span>/ {{ node.status }}</span>
          <span>/ {{ node.role }}</span>
        </div>
      </div>
    </div>
  </div>

  <div v-if="selectedNode" class="flex flex-col gap-6 p-4 kryos-border">
    <KryosPanelTitle title="selected nodes" />
    <div
      class="flex flex-row items-center justify-between kryos-border w-75 p-4"
    >
      <div class="flex flex-row items-center gap-2">
        <KryosLabel label-text="target" />
        <span>{{ selectedNode.unitId }}</span>
      </div>
      <Icon
        class="trns hover:text-(--kryos-text-high)"
        name="material-symbols:close"
        @click="clearSelected"
      />
    </div>
  </div>

  <div
    v-if="selectedNode && isSelectedCommandSetMode"
    class="flex flex-col gap-6 p-4 kryos-border"
  >
    <KryosPanelTitle title="SET_MODE" />
    <div class="flex flex-col gap-1">
      <KryosLabel label-text="set mode" />
      <select
        v-model="setModeSelector"
        name="setModeSelector"
        class="w-50 bg-(--kryos-bg) text-(--kryos-text-mid) p-4 kryos-border"
      >
        <option
          v-for="(option, option_idx) in modeOptions"
          :value="option"
          :key="option_idx"
          class="uppercase"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>

  <div
    v-if="commandReadyToRequest"
    class="flex flex-col gap-6 p-4 kryos-border"
  >
    <KryosPanelTitle title="establish link" />
    <KryosButton
      class="w-25"
      label="dispatch"
      @click="handleCommandRequest"
    />
  </div>
</template>
