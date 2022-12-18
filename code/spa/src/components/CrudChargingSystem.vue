<script setup lang="ts">
import ChargingSystems from "@/models/chargingSystem";
import Delivery from "@/models/delivery";
import type Storage from "@/models/storage";
import Calendar from "primevue/calendar";
import { ref, computed } from "vue";

const emit = defineEmits(["submit", "newValue"]);

const open = () => {
  display.value = true;
};
const submit = () => {
  emit("submit",storage.value.StorageId, properties.value);
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
  if (props.model) {
    const chargingTime = props.model.ChargingTime;
    return new ChargingSystems(chargingTime);
  }});

  const storage_properties = computed(() => {
    const storage = props.storage;
    return storage;
  });

  

const props = defineProps<{
  title: string;
  edit: boolean;
  model: ChargingSystems;
  storage: Storage;
  dropdownStorage: Array<Storage>;
  help_text_fields: {};
}>();

const properties = ref(model_properties);
const storage = ref(storage_properties);
const display = ref(false);

const chargingTimeId = "chargingTime";
const chargingTimeType = "string";
const title = "Add new Charging System";



</script>

<template>
 <Dialog
      :header="title"
      v-model:visible="display"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
    >
    <div class="card p-fluid">
        <div class="field">
            <strong><label :for="chargingTimeId">Charging Time</label></strong>
                <InputText
                    :id="chargingTimeId"
                    :type="chargingTimeType"
                    v-model="properties.ChargingTime"
                />
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

</template>