<script setup lang="ts">
import Delivery from "@/models/delivery";
import type Storage from "@/models/storage";
import Calendar from "primevue/calendar";
import { ref, computed } from "vue";

const emit = defineEmits(["submit", "newValue"]);

const open = () => {
  display.value = true;
};
const submit = () => {
  emit("submit", properties.value);
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
    const deliveryDate = props.model.DeliveryDate;
    const deliveryId = props.model.DeliveryId;
    const deliveryWeight = props.model.DeliveryWeight;
    const finalStorageId = props.model.FinalStorage;
    const timeToLoad = props.model.TimeToLoad;
    const timeToUnload = props.model.TimeToUnload;
    const products = props.model.Products;
    return new Delivery(deliveryId,deliveryDate,deliveryWeight,finalStorageId,timeToLoad,timeToUnload,products);
  }});

  
  const dropdown_properties = computed(() => {
    const storagesList = [];
  if (props.dropdownStorage) {
    for (let i = 0; i < props.dropdownStorage.length; i++) {
        storagesList.push({
        id: props.dropdownStorage[i].StorageId,
        designation: props.dropdownStorage[i].Designation
      });
    }
  }
  return storagesList;
});

const props = defineProps<{
  title: string;
  edit: boolean;
  model: Delivery;
  dropdownStorage: Array<Storage>;
  help_text_fields: {};
}>();

const properties = ref(model_properties);
const storagesList = ref(dropdown_properties);
const display = ref(false);


const delivDateId = "delivDate";
const delivDateType = "string";
const title = "Add new Delivery";

const delivWeightId = "delivWeight";
const delivWeightType = "number";

const finalStorageId = "finalStorage";

const timeToLoadId = "timeToLoad";
const timeToLoadType = "number";

const timeToUnloadId = "timeToUnload";
const timeToUnloadType = "number";


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
            <strong><label :for="delivDateId">Delivery Date</label></strong>
                <Calendar
                    :id="delivDateId"
                    :type="delivDateType"
                    v-model="properties.DeliveryDate"
                />
        </div>

        <div class="field">
            <strong><label :for="delivWeightId">Delivery Weight</label></strong>
                <InputText
                    :id="delivWeightId"
                    :type="delivWeightType"
                    v-model="properties.DeliveryWeight"
                />
        </div>

        <div class="field">
            <strong><label :for="finalStorageId">Final Storage</label></strong>
                <Dropdown
                    :id="finalStorageId"
                    v-model="properties.FinalStorage"
                    :options="storagesList"
                    option-label="designation"
                    option-value="id"
                    placeholder="Select a Storage"/>
        </div>

        <div class="field">
            <strong><label :for="timeToLoadId">Time To Load</label></strong>
                <InputText
                    :id="timeToLoadId"
                    :type="timeToLoadType"
                    v-model="properties.TimeToLoad"
                />
        </div>

        <div class="field">
            <strong><label :for="timeToUnloadId">Time To Unload</label></strong>
                <InputText
                    :id="timeToUnloadId"
                    :type="timeToUnloadType"
                    v-model="properties.TimeToUnload"
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