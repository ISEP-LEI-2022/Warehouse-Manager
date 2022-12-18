<script setup lang="ts">
import ChargingSystems from "@/models/chargingSystem";
import Delivery from "@/models/delivery";
import Product from "@/models/product";
import type Storage from "@/models/storage";
import Calendar from "primevue/calendar";
import { ref, computed } from "vue";

const emit = defineEmits(["submit", "newValue"]);

const open = () => {
  display.value = true;
};
const submit = () => {
  emit("submit",delivery.value.DeliveryId, properties.value);
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
    return new Product(props.model.Name,props.model.Weight,props.model.LevelOfPolution,props.model.Delivery);
  }});



  const delivery_properties = computed(() => {
    const delivery = props.delivery;
    return delivery;
  });

  

const props = defineProps<{
  title: string;
  edit: boolean;
  model: Product;
  delivery: Delivery;
  help_text_fields: {};
}>();

const properties = ref(model_properties);
const delivery = ref(delivery_properties);
const display = ref(false);

const productNameId = "name";
const productNameType = "string";
const productWeightId = "weight";
const productWeightType = "number";
const productLevelOfPolutionId = "levelOfPolution";
const productLevelOfPolutionType = "number";
const title = "Add new Product";



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
            <strong><label :for="productNameId">Name</label></strong>
                <InputText
                    :id="productNameId"
                    :type="productNameType"
                    v-model="properties.Name"
                />
        </div>
        <div class="field">
            <strong><label :for="productWeightId">Weight</label></strong>
                <InputText
                    :id="productWeightId"
                    :type="productWeightType"
                    v-model="properties.Weight"
                />
        </div>
        <div class="field">
            <strong><label :for="productLevelOfPolutionId">Level of polution</label></strong>
                <InputText
                    :id="productLevelOfPolutionId"
                    :type="productLevelOfPolutionType"
                    v-model="properties.LevelOfPolution"
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