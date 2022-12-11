<script setup>
import { useLayout } from "@/layout/composables/layout";

const { layoutConfig, contextPath } = useLayout();
</script>

<template>
  <div class="layout-footer">
    <span class="font-medium ml-2">Powered by:</span>
    <span class="font-medium ml-2"
      >Pedro Marques, Fernando Santos, Ana Guedes, Nuno Fontoura</span
    >
  </div>
</template>
<style lang="scss" scoped></style>
