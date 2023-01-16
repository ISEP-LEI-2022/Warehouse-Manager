<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import StorageService from "@/services/StorageService";
import StorageMap from "@/services/mappers/StorageMap";
import DeliveryMap from "@/services/mappers/DeliveryMap";
import { useToast } from "primevue/usetoast";
import type Storage from "@/models/storage";
import type Delivery from "@/models/delivery";
import ChargingSystems from "@/models/chargingSystem";
import Product from "@/models/product";


const toast = useToast();
const expandedRows = ref([]);
const deliveries = ref([] as Delivery[]);
const allStorages = ref([] as Storage[]);
const storages = ref([] as Storage[]);
const storagesDropdown = ref([] as Storage[]);
const storageService = new StorageService();

const help_delivery_fields = ref({  });
const help_storage_fields = ref({  });

onBeforeMount(() => {
  storageService.getStorages().then((data) => (allStorages.value = data));
  storageService.getStoragesPagination(page,perPage).then((data) => { storages.value = data.storageList, totalRecords = data.totalRecords; console.log(storages.value)} );
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
        //storages.value.push(new_storage);
        storageService.getStoragesPagination(page,perPage).then((data) => { storages.value = data.storageList, totalRecords = data.totalRecords; console.log(storages.value)} );
        closeNewStorage()
      }
    )
  );
};

const addChargingSystem = () => {
  const chargingSystemToCreate = chargingSystem;
  console.log(chargingSystem_storageId)
  var storage: Storage
  storageService.getStorageById(chargingSystem_storageId).then((response) => {
    if(response?.StorageId == "") {
      return null;
    }else{
      storage = response;
      console.log(storage)
      storage.Chargingsystems.push(new ChargingSystems(chargingSystemToCreate.ChargingTime));
      storageService.updateStorage(storage).then((response) => 
      processResponse(
          response,
          "Add Charging System",
          () => {
            closeNewChargingSystem();
          }
        )
      );
    }
    
  })
};

const addProduct = () => {
  const productToCreate = product;
  console.log(productToCreate)
  console.log(product_deliveryId)
  var delivery: Delivery;
  storageService.getDeliveryById(product_deliveryId).then((response) => {
    if(response?.DeliveryId == "") {
      console.log("No Delivery")
      return null;
    }else{
      delivery = response;
      console.log(delivery)
      delivery.Products.push(new Product(productToCreate.Name, productToCreate.Weight, productToCreate.LevelOfPolution, product_deliveryId));
      storageService.updateDelivery(delivery).then((response) => 
      processResponse(
          response,
          "Add Product",
          () => {
            closeNewProduct();
          }
        )
      );
    }
  })
};



const addDelivery = () => {
  //const new_delivery = DeliveryMap.fromAnyArray(delivery);
  storageService.createDelivery(delivery).then((response) =>
    processResponse(
      response,
      "Create Delivery",
      () => {
        //deliveries.value.push(delivery);
        storageService.getDeliveries().then((data) => (deliveries.value = data));
        closeNewDelivery()
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
 
var page = 1;
const perPage = 3
var totalRecords = 0

const displayNewStorage = ref(false);
const displayChargingSystem = ref(false);

const displayNewDelivery = ref(false);
const displayProduct = ref(false);

const openNewStorage = () => {
  displayNewStorage.value = true;
};

const closeNewStorage = () => {
  storage = StorageMap.empty()
  displayNewStorage.value = false;
};

const openNewChargingSystem = (storageId: string) => {
  console.log(chargingSystem_storageId)
  console.log(storageId)
  chargingSystem_storageId  = storageId;
  displayChargingSystem.value = true;
};

const closeNewChargingSystem = () => {
  chargingSystem_storageId  = "";
  chargingSystem = StorageMap.emptyChargingSystem();
  displayChargingSystem.value = false;
  storageService.getStoragesPagination(page,perPage).then((data) => { storages.value = data.storageList, totalRecords = data.totalRecords; console.log(storages.value)} );
};

const openNewDelivery = () => {
  displayNewDelivery.value = true;
};

const closeNewDelivery = () => {
  delivery = DeliveryMap.empty();
  displayNewDelivery.value = false;
};

const openNewProduct = (deliveryId: string) => {
  console.log(deliveryId)
  product_deliveryId  = deliveryId;
  displayProduct.value = true;
};

const closeNewProduct = () => {
  product_deliveryId  = "";
  product = DeliveryMap.emptyProduct();
  displayProduct.value = false;
  storageService.getDeliveries().then((data) => ( deliveries.value = data ) );
};

const updateStorageStatus = (StorageId : string) => {
  storageService.updateStorageStatus(StorageId).then((response) => {
    if(response == true){
      toast.add({
        severity: "success",
        summary: "Storage Status Updated",
        detail: "OK",
        life: 3000,
      });
      storageService.getStoragesPagination(page,perPage).then((data) => { storages.value = data.storageList, totalRecords = data.totalRecords; console.log(storages.value)} );
    }else{
      toast.add({
        severity: "error",
        summary: "Error On Storage Status Update",
        detail: "Error",
        life: 3000,
      });
    }
  })

};

var storage = StorageMap.empty();
var chargingSystem = StorageMap.emptyChargingSystem();
var chargingSystem_storageId = "";


var delivery = DeliveryMap.empty();
var product = DeliveryMap.emptyProduct();
var product_deliveryId = "";



const onPage = (event) => {
  page = event.page + 1;
  storageService.getStoragesPagination(page,perPage).then((data) => { storages.value = data.storageList, totalRecords = data.totalRecords } );
}

const handleChangeDropdownValue = (event) => {
  delivery.FinalStorage = event.value.StorageId;
  console.log(delivery.FinalStorage)
}
const handleChangeDeliveryDate = (event) => {
  delivery.DeliveryDate = event;
  console.log(delivery.DeliveryDate)
}

const showDeliveryDialog = () => {
  storageService.getStorages().then((data) => (storagesDropdown.value = data));
}

var selectedOption = ref(null);

const currentDate = new Date()

const formatDate = (date) => {
  return new Date(date).toDateString()
}

const selectedDate = ref(null);
</script>


<template>
  <TabView>

    <TabPanel header="Storages">
      <div class = "card">
        <Toast /> 
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
                <InputText id="desig" v-model.trim="storage.Designation" required="true"  />
            </div>

            <div class="field">
              <strong><label for="lat">Latitude</label></strong>
                <InputText id="lat" v-model.trim="storage.Latitude" required="true"  />
            </div>

            <div class="field">
              <strong><label for="lon">Longitude</label></strong>
                <InputText id="lon" v-model.trim="storage.Longitude" required="true"  />
            </div>

            <div class="field">
              <strong><label for="alt">Altitude</label></strong>
                <InputText id="alt" v-model.trim="storage.Altitude" required="true"  />
            </div>

            <div class="field">
              <strong><label for="str">Street</label></strong>
                <InputText id="str" v-model.trim="storage.Street" required="true"  />
            </div>

            <div class="field">
              <strong><label for="door">Door</label></strong>
                <InputText id="door" v-model.trim="storage.Door" required="true"  />
            </div>

            <div class="field">
              <strong><label for="floor">Floor</label></strong>
                <InputText id="floor" v-model.trim="storage.Floor" required="true"  />
            </div>

            <div class="field">
              <strong><label for="pcode">PostalCode</label></strong>
                <InputText id="pcode" v-model.trim="storage.PostalCode" required="true"  />
            </div>

            <div class="field">
              <strong><label for="citynu">City Number</label></strong>
                <InputText type="number" id="citynu" v-model.trim="storage.Number" required="true" :min="0"  />
            </div>

            <div class="field">
              <strong><label for="cityna">City Name</label></strong>
                <InputText id="cityna" v-model.trim="storage.Name" required="true"  />
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
                <InputText id="ctime" v-model.trim="chargingSystem.ChargingTime" required="true"  />
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

        

        <DataTable :value="storages" v-model:expandedRows="expandedRows" dataKey="StorageId" :rows="perPage" >
          <template #empty>
                No storages found.
            </template>
            <template #loading>
                Loading storage data. Please wait.
            </template>
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

          <Column field="active" header="Available" sortable>
            <template #body="slotProps" sortable>
              <span v-if="slotProps.data.Active == true">Available</span>
              <span v-else>Not Available</span>
            </template>
          </Column>
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <Button v-if="slotProps.data.Active == true" label="Close Storage" @click="updateStorageStatus(slotProps.data.StorageId)"/>
              <Button v-else label="Open Storage" @click="updateStorageStatus(slotProps.data.StorageId)"/>
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
                      </DataTable>
                  </div>
              </template>
        </DataTable>
        <Paginator :rows="perPage" :totalRecords="totalRecords" @page="onPage($event)"></Paginator>
      </div> 
    </TabPanel>

    <TabPanel header="Deliveries">
      <div class = "card">
        <Toast /> 
        <Dialog 
          v-model:visible="displayNewDelivery"
          :style="{ width: '30vw' }" 
          :modal="true" 
          class="p-fluid"
          :value="delivery"   
          header="Add New Delivery"
          @show="showDeliveryDialog">
        
          <div class = "card p-fluid">
            <div class="field">
              <strong><label for="ddate">Delivery Date</label></strong>
              <Calendar :showIcon="true" :showButtonBar="true" v-model="selectedDate" placeholder="Select a Date" @date-select="handleChangeDeliveryDate" :min-date="currentDate"/>
                          
            </div>

            <div class="field">
              <strong><label for="dw">Delivery Weight</label></strong>
                <InputText type="number" id="dw" v-model.trim="delivery.DeliveryWeight" required="true" :min="0"  />
            </div>

            <div class="field">
              <strong><label for="lon">Final Storage</label></strong>
              <Dropdown
                id="dfinal"
                v-model="selectedOption"
                :options="storagesDropdown"
                option-label="Designation"
                placeholder="Select a Storage"
                @change="handleChangeDropdownValue"/>
              
            </div>

            <div class="field">
              <strong><label for="ttl">Time To Load</label></strong>
              <InputText type="number" id="ttl" v-model.trim="delivery.TimeToLoad" required="true" :min="0"  />
            </div>

            <div class="field">
              <strong><label for="str">Time To Unload</label></strong>
              <InputText type="number" id="str" v-model.trim="delivery.TimeToUnload" required="true" :min="0"  />
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
                <InputText id="n" v-model.trim="product.Name" required="true"   />
            </div>
            <div class="field">
              <strong><label for="w">Weight</label></strong>
                <InputText type="number" id="w" v-model.trim="product.Weight" required="true" :min="0"  />
            </div>
            <div class="field">
              <strong><label for="lop">Level Of Polution</label></strong>
                <InputText type="number" id="lop" v-model.trim="product.LevelOfPolution" required="true" :min="0"  />
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
          <template #empty>
                No Deliveries found.
            </template>
            <template #loading>
                Loading deliveries data. Please wait.
            </template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="ddate" header="Delivery Date" sortable>
            <template #body="slotProps" sortable>
              {{ formatDate(slotProps.data.DeliveryDate) }}
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
                  allStorages.find((item) => {
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

          <template #expansion="slotProps">
                  <div class="orders-subtable">
                      <h5>Products for  {{
                                            allStorages.find((item) => {
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
