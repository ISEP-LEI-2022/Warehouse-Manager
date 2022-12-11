<template>
  <div v-if="props.icon == 'Trucks'"
    class="flex align-items-center justify-content-center bg-blue-100 border-round"
    style="width: 2.5rem; height: 2.5rem"
  >
    <i class="pi pi-car text-blue-500 text-xl"></i>
  </div>
  <div v-if="props.icon == 'Routes'"
    class="flex align-items-center justify-content-center bg-orange-100 border-round"
    style="width: 2.5rem; height: 2.5rem"
  >
    <i class="pi pi-map-marker text-orange-500 text-xl"></i>
  </div>
  <div v-if="props.icon == 'Deliveries'"
    class="flex align-items-center justify-content-center bg-cyan-100 border-round"
    style="width: 2.5rem; height: 2.5rem"
  >
    <i class="pi pi-box text-cyan-500 text-xl"></i>
  </div>
  <div v-if="props.icon == 'Storages'"
    class="flex align-items-center justify-content-center bg-purple-100 border-round"
    style="width: 2.5rem; height: 2.5rem"
  >
    <i class="pi pi-building text-purple-500 text-xl"></i>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
}>();
</script>
