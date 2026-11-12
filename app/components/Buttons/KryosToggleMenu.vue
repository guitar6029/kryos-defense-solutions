<script lang="ts" setup>
withDefaults(defineProps<{
  expanded?: boolean;
  controls?: string;
}>(), { expanded: false });

const emit = defineEmits<{
  (e: "toggle-menu", trigger: HTMLElement): void;
}>();
</script>

<template>
  <div class="fixed top-5 right-5 z-110 min-[751px]:hidden">
    <button
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-sm text-(--kryos-2077-text-primary) transition-colors hover:text-(--kryos-2077-brand-accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kryos-2077-focus)"
      :aria-label="expanded ? 'Close navigation menu' : 'Open navigation menu'"
      :aria-expanded="expanded"
      :aria-controls="controls"
      @click="emit('toggle-menu', $event.currentTarget as HTMLElement)"
    >
      <Icon :name="expanded ? 'lucide:x' : 'lucide:menu'" size="24" aria-hidden="true" />
    </button>
  </div>
</template>
