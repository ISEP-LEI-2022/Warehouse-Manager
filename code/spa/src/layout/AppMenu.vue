<script setup>
import { ref } from "vue";
import { userStore } from '@/stores/user'
import AppMenuItem from "./AppMenuItem.vue";


const store = userStore();

const model = ref([
  {
    label: "Home",
    items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
  },
  {
    label: "Management",
    visible: store.has_management_access,
    items: [
      {
        label: "Logistics",
        icon: "pi pi-fw pi-car",
        to: "/logistics",
        visible: store.has_logistics_access
      },
      {
        label: "Storage",
        icon: "pi pi-fw pi-box",
        to: "/storage",
        visible: store.has_storage_access
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
