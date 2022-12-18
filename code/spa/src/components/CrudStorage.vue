<script setup lang="ts">
import Delivery from "@/models/delivery";
import Storage from "@/models/storage";
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
    const storageId = props.model.StorageId
    const designation = props.model.Designation;
    const latitude = props.model.Latitude;
    const longitude = props.model.Longitude;
    const altitude = props.model.Altitude;
    const street = props.model.Street;
    const door = props.model.Door;
    const floor = props.model.Floor;
    const postalCode = props.model.PostalCode;
    const cityNumber = props.model.Number;
    const cityName = props.model.Name;
    const chargingSystems = props.model.Chargingsystems;

    return new Storage(storageId,designation,latitude,longitude,altitude,street,door,floor,postalCode,cityNumber,cityName, chargingSystems);
  }});

const props = defineProps<{
  title: string;
  edit: boolean;
  model: Storage;
  help_text_fields: {};
}>();

const properties = ref(model_properties);
const display = ref(false);

const title = "Add new Storage";

const desigId = "desig";
const desigType = "string";


const latId = "lat";
const latType = "string";

const lonId = "lon";
const lonType = "string";

const altId = "timeToUnload";
const altType = "string";

const strId = "str";
const strType = "string";

const doorId = "door";
const doorType = "string";

const floorId = "floor";
const floorType = "string";

const postalCodeId = "postalCode";
const postalCodeType = "string";

const cityNumberId = "cityNumber";
const cityNumberType = "number";

const cityNameId = "timeToUnload";
const cityNameType = "string";

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
            <strong><label :for="desigId">Designation</label></strong>
                <InputText
                    :id="desigId"
                    :type="desigType"
                    v-model="properties.Designation"
                />
        </div>

        <div class="field">
            <strong><label :for="latId">Latitude</label></strong>
                <InputText
                    :id="latId"
                    :type="latType"
                    v-model="properties.Latitude"
                />
        </div>

        <div class="field">
            <strong><label :for="lonId">Longitude</label></strong>
                <InputText
                    :id="lonId"
                    :type="lonType"
                    v-model="properties.Longitude"
                />
        </div>

        <div class="field">
            <strong><label :for="altId">Altitude</label></strong>
                <InputText
                    :id="altId"
                    :type="altType"
                    v-model="properties.Altitude"
                />
        </div>

        <div class="field">
            <strong><label :for="strId">Street</label></strong>
                <InputText
                    :id="strId"
                    :type="strType"
                    v-model="properties.Street"
                />
        </div>

        <div class="field">
            <strong><label :for="doorId">Door</label></strong>
                <InputText
                    :id="doorId"
                    :type="doorType"
                    v-model="properties.Door"
                />
        </div>

        <div class="field">
            <strong><label :for="floorId">Floor</label></strong>
                <InputText
                    :id="floorId"
                    :type="floorType"
                    v-model="properties.Floor"
                />
        </div>

        <div class="field">
            <strong><label :for="postalCodeId">Postal Code</label></strong>
                <InputText
                    :id="postalCodeId"
                    :type="postalCodeType"
                    v-model="properties.PostalCode"
                />
        </div>

        <div class="field">
            <strong><label :for="cityNumberId">City Number</label></strong>
                <InputText
                    :id="cityNumberId"
                    :type="cityNumberType"
                    v-model="properties.Number"
                />
        </div>

        <div class="field">
            <strong><label :for="cityNameId">City Name</label></strong>
                <InputText
                    :id="cityNameId"
                    :type="cityNameType"
                    v-model="properties.Name"
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