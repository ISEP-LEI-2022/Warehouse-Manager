<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import StorageService from "@/services/StorageService";
import CrudDialog from "@/components/CrudDialog.vue";
import StorageMap from "@/services/mappers/StorageMap";
import DeliveryMap from "@/services/mappers/DeliveryMap";
import { useToast } from "primevue/usetoast";
import type Storage from "@/models/storage";
import type Delivery from "@/models/delivery";
import ChargingSystems from "@/models/chargingSystem";
import CrudChargingSystem from "@/components/CrudChargingSystem.vue";
import CrudProduct from "@/components/CrudProduct.vue";
import Product from "@/models/product";
import CrudStorage from "@/components/CrudStorage.vue";
import CrudDeliveryTest from "@/components/CrudDeliveryTest.vue";

const toast = useToast();
const expandedRows = ref([]);
const deliveries = ref([] as Delivery[]);
const storages = ref([] as Storage[]);
const storageService = new StorageService();

const help_delivery_fields = ref({  });
const help_storage_fields = ref({  });

const buildAddress = (
  Street: string,
  Door: string,
  Floor: string,
  PostalCode: string,
  City: string
) => {
  return `${Street}, ${Door} - ${Floor}, ${PostalCode}, ${City}`;
};

onBeforeMount(() => {
  storageService.getStorages().then((data) => (storages.value = data));
  storageService.getDeliveries().then((data) => (deliveries.value = data));
});


const addStorage = () => {
  const new_storage = storage;
  console.log(new_storage);
  storageService.createStorage(new_storage).then((response) =>
    processResponse(
      response,
      "Create Storage",
      () => {
        storages.value.push(new_storage);
      }
    )
  );
};

const addChargingSystem = () => {
  const chargingSystemToCreate = chargingSystem;
  var index: number;
  index = storages.value.findIndex((item) => item.StorageId = chargingSystem_storageId);
  storages.value[index].Chargingsystems.push(new ChargingSystems(chargingSystemToCreate.ChargingTime));
  storageService.updateStorage(storages.value[index]);

};

const addProduct = () => {
  const productToCreate = product;
  var index: number;
  index = deliveries.value.findIndex((item) => item.DeliveryId = product_deliveryId);

  deliveries.value[index].Products.push(productToCreate);

  storageService.updateDelivery(deliveries.value[index]);

};



const addDelivery = () => {
  //const new_delivery = DeliveryMap.fromAnyArray(delivery);
  storageService.createDelivery(delivery).then((response) =>
    processResponse(
      response,
      "Create Delivery",
      () => {
        deliveries.value.push(delivery);
      }
    )
  );
};

const processResponse = (
  resp: any,
  message: string = "",
  onSuccess: Function,
  onError: Function = ()=> {}
) => {
  if ("code" in resp) {
    toast.add({
      severity: "error",
      summary: resp.message,
      detail: resp.errors[0],
      life: 3000,
    });
    onError();
  } else {
    toast.add({
      severity: "success",
      summary: message,
      detail: "OK",
      life: 3000,
    });
    onSuccess();
  }
};
 

const displayNewStorage = ref(false);
const displayChargingSystem = ref(false);

const displayNewDelivery = ref(false);
const displayProduct = ref(false);

const openNewStorage = () => {
  displayNewStorage.value = true;
};

const openNewChargingSystem = (storageId: string) => {
  chargingSystem_storageId  = storageId;
  displayChargingSystem.value = true;
};

const openNewDelivery = () => {
  displayNewDelivery.value = true;
};

const openNewProduct = (deliveryId: string) => {
  product_deliveryId  = deliveryId;
  displayProduct.value = true;
};

var storage = StorageMap.empty();
var chargingSystem = StorageMap.emptyChargingSystem();
var chargingSystem_storageId = "";


var delivery = DeliveryMap.empty();
var product = DeliveryMap.emptyProduct();
var product_deliveryId = "";

var date = new Date()
</script>


<template>
  <TabView>

    <TabPanel header="Storages">
      <div class = "card">
        <Dialog 
          v-model:visible="displayNewStorage"
          :style="{ width: '30vw' }" 
          :modal="true" 
          class="p-fluid"
          :value="storage"   
          header="Add New Storage">
        
          <div class = "card p-fluid">
            <div class="field">
              <strong><label for="desig">Designation</label></strong>
                <InputText id="desig" v-model.trim="storage.Designation" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="lat">Latitude</label></strong>
                <InputText id="lat" v-model.trim="storage.Latitude" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="lon">Longitude</label></strong>
                <InputText id="lon" v-model.trim="storage.Longitude" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="alt">Altitude</label></strong>
                <InputText id="alt" v-model.trim="storage.Altitude" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="str">Street</label></strong>
                <InputText id="str" v-model.trim="storage.Street" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="door">Door</label></strong>
                <InputText id="door" v-model.trim="storage.Door" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="floor">Floor</label></strong>
                <InputText id="floor" v-model.trim="storage.Floor" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="pcode">PostalCode</label></strong>
                <InputText id="pcode" v-model.trim="storage.PostalCode" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="citynu">City Number</label></strong>
                <InputNumber id="citynu" v-model.trim="storage.Number" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="cityna">City Name</label></strong>
                <InputText id="cityna" v-model.trim="storage.Name" required="true" autofocus  />
            </div>
          </div>
          <template #footer>
          <Button
            label="Save"
            @click="addStorage"
            icon="pi pi-check"
            class="p-button-outlined"
          />
        </template>
        </Dialog>
      
        <Dialog 
          v-model:visible="displayChargingSystem"
          :style="{ width: '30vw' }" 
          :modal="true" 
          class="p-fluid"
          :value="chargingSystem"   
          header="Add New Charging System">
        
          <div class = "card p-fluid">
            <div class="field">
              <strong><label for="ctime">Charging Time</label></strong>
                <InputText id="ctime" v-model.trim="chargingSystem.ChargingTime" required="true" autofocus  />
            </div>
          </div>
          <template #footer>
          <Button
            label="Save"
            @click="addChargingSystem"
            icon="pi pi-check"
            class="p-button-outlined"
          />
          </template>
        </Dialog>

      <Button
        label="Add New Storage"
        icon="pi pi-external-link"
        style="width: auto"
        @click="openNewStorage"/>

        

        <DataTable :value="storages" v-model:expandedRows="expandedRows" dataKey="StorageId">
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="desig" header="Designation" sortable>
            <template #body="slotProps" sortable>
              {{ slotProps.data.Designation }}
            </template>
          </Column>
            
          <Column field="addr" header="Address" sortable>
            <template #body="slotProps" sortable>
              {{ slotProps.data.Street +", "+ slotProps.data.Name + ", " + slotProps.data.PostalCode }}
            </template>
          </Column>
          <Column field="loc" header="Location" sortable>
            <template #body="slotProps" sortable>
              {{  `(${slotProps.data.Latitude},${slotProps.data.Longitude},${slotProps.data.Altitude})` }}
            </template>
          </Column>

          <Column headerStyle="width:4rem">
            <template #body>
              <Button icon="pi pi-pencil" />
            </template>
          </Column>

          <template #expansion="slotProps">
                  <div class="orders-subtable">
                      <h5>Charging Systems for  {{slotProps.data.Designation}}</h5>
                      <Button
                        label="Add New Charging System"
                        icon="pi pi-external-link"
                        style="width: auto"
                        @click="openNewChargingSystem(slotProps.data.StorageId)"/>

                      <DataTable :value="slotProps.data.Chargingsystems">
                        
                          <Column field="charging_time_col" header="Charging Time [Min]" sortable>
                              <template #body="slotProps" sortable>
                                {{ slotProps.data.chargingTime }}
                              </template>
                          </Column>
                          <Column headerStyle="width:4rem">
                              <template #body>
                                  <Button icon="pi pi-pencil" />
                              </template>
                          </Column>
                      </DataTable>
                  </div>
              </template>
        </DataTable>
      </div> 
    </TabPanel>

    <TabPanel header="Deliveries">
      <div class = "card">
        <Dialog 
          v-model:visible="displayNewDelivery"
          :style="{ width: '30vw' }" 
          :modal="true" 
          class="p-fluid"
          :value="delivery"   
          header="Add New Delivery">
        
          <div class = "card p-fluid">
            <div class="field">
              <strong><label for="ddate">Delivery Date</label></strong>
              <Calendar inputId="basic" v-model="date" autocomplete="off" />
              
            
            </div>

            <div class="field">
              <strong><label for="dw">Delivery Weight</label></strong>
                <InputNumber id="dw" v-model.trim="delivery.DeliveryWeight" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="lon">Final Storage</label></strong>
                <Dropdown
                    id="dfinal"
                    v-model="delivery.FinalStorage"
                    :options="storages"
                    option-label="Designation"
                    option-value="Id"
                    placeholder="Select a Storage"/>
            </div>

            <div class="field">
              <strong><label for="ttl">Time To Load</label></strong>
                <InputNumber id="ttl" v-model.trim="delivery.TimeToLoad" required="true" autofocus  />
            </div>

            <div class="field">
              <strong><label for="str">Time To Unload</label></strong>
                <InputNumber id="str" v-model.trim="delivery.TimeToUnload" required="true" autofocus  />
            </div>
          </div>
          <template #footer>
          <Button
            label="Save"
            @click="addDelivery"
            icon="pi pi-check"
            class="p-button-outlined"
          />
        </template>
        </Dialog>
      
        <Dialog 
          v-model:visible="displayProduct"
          :style="{ width: '30vw' }" 
          :modal="true" 
          class="p-fluid"
          :value="product"   
          header="Add New Product">
        
          <div class = "card p-fluid">
            <div class="field">
              <strong><label for="n">Name</label></strong>
                <InputText id="n" v-model.trim="product.Name" required="true" autofocus  />
            </div>
            <div class="field">
              <strong><label for="w">Weight</label></strong>
                <InputNumber id="w" v-model.trim="product.Weight" required="true" autofocus  />
            </div>
            <div class="field">
              <strong><label for="lop">Level Of Polution</label></strong>
                <InputNumber id="lop" v-model.trim="product.LevelOfPolution" required="true" autofocus  />
            </div>
          </div>
          <template #footer>
          <Button
            label="Save"
            @click="addProduct"
            icon="pi pi-check"
            class="p-button-outlined"
          />
          </template>
        </Dialog>

      <Button
        label="Add New Delivery"
        icon="pi pi-external-link"
        style="width: auto"
        @click="openNewDelivery"/>

        

        <DataTable :value="deliveries" v-model:expandedRows="expandedRows" dataKey="DeliveryId">
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="ddate" header="Delivery Date" sortable>
            <template #body="slotProps" sortable>
              {{ slotProps.data.DeliveryDate }}
            </template>
          </Column>
            
          <Column field="dweight" header="Weight" sortable>
            <template #body="slotProps" sortable>
              {{ slotProps.data.DeliveryWeight }}
            </template>
          </Column>
          <Column field="dstor" header="Final Storage" sortable>
            <template #body="slotProps" sortable>
              {{
                  storages.find((item) => {
                    return item?.StorageId == slotProps.data.FinalStorage;
                  })?.Designation
              }}
            </template>
          </Column>
          <Column field="dtimeload" header="Time To Load [Min]" sortable>
            <template #body="slotProps" sortable>
              {{ slotProps.data.TimeToLoad }}
            </template>
          </Column>
          <Column field="dtimeunload" header="Time To Unload [Min]" sortable>
            <template #body="slotProps" sortable>
              {{ slotProps.data.TimeToUnload }}
            </template>
          </Column>

          <Column headerStyle="width:4rem">
            <template #body>
              <Button icon="pi pi-pencil" />
            </template>
          </Column>

          <template #expansion="slotProps">
                  <div class="orders-subtable">
                      <h5>Products for  {{
                                            storages.find((item) => {
                                              return item?.StorageId == slotProps.data.FinalStorage;
                                            })?.Designation
                                        }}</h5>
                      <Button
                        label="Add New Product"
                        icon="pi pi-external-link"
                        style="width: auto"
                        @click="openNewProduct(slotProps.data.DeliveryId)"/>

                      <DataTable :value="slotProps.data.Products">
                        
                          <Column field="name_col" header="Name" sortable>
                              <template #body="slotProps" sortable>
                                {{ slotProps.data.name }}
                              </template>
                          </Column>
                          <Column field="weight_col" header="Weight" sortable>
                              <template #body="slotProps" sortable>
                                {{ slotProps.data.weight }}
                              </template>
                          </Column>
                          <Column field="lop_col" header="Level Of Polution" sortable>
                              <template #body="slotProps" sortable>
                                {{ slotProps.data.levelOfPolution }}
                              </template>
                          </Column>
                          <Column headerStyle="width:4rem">
                              <template #body>
                                  <Button icon="pi pi-pencil" />
                              </template>
                          </Column>
                      </DataTable>
                  </div>
              </template>
        </DataTable>
      </div> 
    </TabPanel>










  </TabView>
</template>

<style scoped lang="scss">
@import "@/assets/demo/styles/badges.scss";
</style>
