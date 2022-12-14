<script setup lang="ts">
import { ref } from "vue";

const display = ref(false);

const open = () => {
  display.value = true;
  console.log(props.model);
};
const close = () => {
  display.value = false;
};

const props = defineProps<{
  title: string;
  content: string;
  edit: boolean;
  model: Object;
}>();
</script>

<template>
  <div style="margin-bottom: 1rem">
    <Dialog
      :header="props.title"
      v-model:visible="display"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
    >
      <div class="card p-fluid">
        <div class="field">
          <label for="name1">Name</label>
          <InputText id="name1" type="text" />
        </div>
        <div class="field">
          <label for="email1">Email</label>
          <InputText id="email1" type="text" />
        </div>
        <div class="field">
          <label for="age1">Age</label>
          <InputText id="age1" type="text" />
        </div>
      </div>
      <template #footer>
        <Button
          label="Ok"
          @click="close"
          icon="pi pi-check"
          class="p-button-outlined"
        />
      </template>
    </Dialog>
    <Button
      v-if="!edit"
      label="Add"
      icon="pi pi-external-link"
      style="width: auto"
      @click="open"
    />
    <Button v-else icon="pi pi-pencil" @click="open" />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/demo/styles/badges.scss";
</style>
