<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(["submit", "newValue"]);

const open = () => {
  display.value = true;
};
const submit = () => {
  emit("submit", properties.value);
};

const disable_field = (field_name: string) => {
  if (field_name in props.disabled_fields) {
    return true;
  }
  return false;
};

function unCamelCase(str: string) {
  return (
    str
      // insert a space between lower & upper
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // space before last upper in a sequence followed by lower
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
}

const model_properties = computed(() => {
  const properties = [];
  if (props.model) {
    const keys = Object.getOwnPropertyNames(props.model);
    const values = Object.values(props.model);
    for (let i = 0; i < keys.length; i++) {
      properties.push({
        index: i,
        name: keys[i],
        value: values[i],
        type: typeof values[i],
      });
    }
  }
  return properties;
});

const props = defineProps<{
  title: string;
  edit: boolean;
  model: object;
  help_text_fields: {};
  disabled_fields: string[];
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
            ><label :for="property.name"
              >{{ unCamelCase(property.name) }} *</label
            ></strong
          >
          <InputText
            :id="property.name"
            :type="property.type"
            v-model="properties[index].value"
            :disabled="disable_field(property.name)"
          />
          <small v-if="props.help_text_fields[property.name]">{{
            props.help_text_fields[property.name]
          }}</small>
        </div>
      </div>
      <template #footer>
        <Button
          label="Save"
          @click="submit"
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
