<template>
  <div class="col-12 lg:col-6 xl:col-3">
    <div class="card mb-0">
      <div class="flex justify-content-between mb-3">
        <div :id="`${props.title}-card-item`">
          <span class="block text-500 font-medium mb-3">{{ props.title }}</span>
          <div class="text-900 font-medium text-xl">{{ props.content }}</div>
        </div>
        <IconElement :icon="props.title" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  content: string;
}>();
</script>
