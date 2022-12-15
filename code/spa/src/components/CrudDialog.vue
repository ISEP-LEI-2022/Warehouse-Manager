<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(["submit"]);

const open = () => {
  display.value = true;
};
const close = () => {
  display.value = false;
  emit("submit", properties.value);
};
const validation_class = (invalid: boolean) => {
  if (invalid) return "p-invalid";
  return "";
};
const model_properties = computed(() => {
  const keys = Object.getOwnPropertyNames(props.model);
  const values = Object.values(props.model);
  const properties = [];
  for (let i = 0; i < keys.length; i++) {
    properties.push({
      key: keys[i],
      value: values[i],
      type: typeof values[i],
    });
  }
  return properties;
});

const props = defineProps<{
  title: string;
  edit: boolean;
  model: Object;
  invalid_fields: string[];
}>();

const properties = ref(model_properties);
const display = ref(false);
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
        <div v-for="(property, index) in properties" :key="index" class="field">
          <strong
            ><label :for="property.key">{{ property.key }}</label></strong
          >
          <InputText
            :id="property.key"
            :type="property.type"
            v-model="properties[index].value"
            :class="validation_class(property.key in props.invalid_fields)"
          />
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
