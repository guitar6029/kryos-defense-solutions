<script lang="ts" setup>
const props = defineProps<{
  data: KryosNode[];
}>();
console.log('data: ', props.data)
</script>

<template>
  <UTable :data="data" />
</template>
