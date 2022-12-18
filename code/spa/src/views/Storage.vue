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


const addStorage = (storage: Array<any>) => {
  const new_storage = StorageMap.fromAnyArray(storage);
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

const addChargingSystem = (chargingSystems: Array<any>) => {
  const chargingSystem = StorageMap.fromAnyArrayChargingSystem(chargingSystems);
  var index: number;
  index = storages.value.findIndex((item) => item.StorageId = chargingSystem.Storage);

  storages.value[index].Chargingsystems.push(new ChargingSystems(chargingSystem.ChargingTime));

  storageService.updateStorage(storages.value[index]);

};


const addDelivery = (delivery: Array<any>) => {
  const new_delivery = DeliveryMap.fromAnyArray(delivery);
  storageService.createDelivery(new_delivery).then((response) =>
    processResponse(
      response,
      "Create Delivery",
      () => {
        deliveries.value.push(new_delivery);
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

</script>

<template>
  <TabView>
    <TabPanel header="Storages">
      <CrudDialog 
      v-if="storageService.Storage_Errors.length == 0"
      title="Add new Storage" 
      :edit="false"
      :model="StorageMap.empty()"
      :help_text_fields="help_storage_fields"
      :disabled_fields="[]"
      @submit="addStorage"/>

      <div class="card">
        <DataTable
          :value="storages"
          :rows="10"
          :paginator="true"
          v-model:expandedRows="expandedRows"
          dataKey="id"
          responsiveLayout="scroll"
        >
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="designation" header="Designation" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.Designation }}
            </template>
          </Column>
          <Column field="Address" header="Address">
            <template #body="slotProps">
              {{
                
                slotProps.data.Street +", "+ slotProps.data.Name + ", " + slotProps.data.PostalCode
                
              }}
            </template>
          </Column>
          <Column field="location" header="Location" :sortable="true">
            <template #body="slotProps">
              {{
                `(${slotProps.data.Latitude},${slotProps.data.Latitude},${slotProps.data.Latitude})`
              }}
            </template>
          </Column>
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <CrudDialog
                :title="`Edit Storage '${slotProps.data.Designation}'`"
                :edit="true"
                :model="storageService.getStorageById(`${slotProps.data.StorageId}`)"
                :help_text_fields="help_storage_fields"
                :disabled_fields="[]"
                @submit="addStorage"/>
              
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Charging Systems</h5>

              <CrudDialog 
                v-if="storageService.Storage_Errors.length == 0"
                title="Add new Charging System" 
                :edit="false"
                :model="StorageMap.emptyChargingSystem(`${slotProps.data.StorageId}`)"
                :help_text_fields="help_storage_fields"
                :disabled_fields="[]"
                @submit="addChargingSystem"/>

              <DataTable
                :value="slotProps.data.Chargingsystems"
                responsiveLayout="scroll"
              >
                <Column
                  field="chargingTime"
                  header="Charging Time [min]"
                  :sortable="true"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.chargingTime }}
                  </template>
                </Column>
                <Column headerStyle="width:4rem">
                  <template #body="slotProps">
                    <CrudDialog
                      :title="`Edit Charging System '${slotProps.data.chargingTime}'`"
                      :edit="true"
                    />
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </div>
    </TabPanel>
    <TabPanel header="Deliveries">
      <CrudDialog 
      v-if="storageService.Delivery_Errors.length == 0"
      title="Add new Delivery" 
      :edit="false"
      :model="DeliveryMap.empty()"
      :help_text_fields="help_delivery_fields"
      :disabled_fields="[]"
      @submit="addDelivery"
      
      
      />
      <div class="card">
        <DataTable
          :value="deliveries"
          :rows="10"
          :paginator="true"
          v-model:expandedRows="expandedRows"
          dataKey="id"
          responsiveLayout="scroll"
        >
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="deliveryDate" header="Date" :sortable="true">
            <template #body="slotProps">
              {{ new Date(slotProps.data.DeliveryDate).toLocaleString() }}
            </template>
          </Column>
          <Column field="deliveryWeight" header="Weight [kg]" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.DeliveryWeight }}
            </template>
          </Column>
          <Column field="finalStorageId" header="Final Storage">
            <template #body="slotProps">
              <a href="#/uikit/storage">
                {{
                  storages.find((item) => {
                    return item?.StorageId == slotProps.data.FinalStorage;
                  })?.Designation
                }}
              </a>
            </template>
          </Column>
          <Column field="timeToLoad" header="Time To Load [min]">
            <template #body="slotProps">
              {{ slotProps.data.TimeToLoad }}
            </template>
          </Column>
          <Column field="timeToUnload" header="Time To Unload [min]">
            <template #body="slotProps">
              {{ slotProps.data.TimeToUnload }}
            </template>
          </Column>
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <CrudDialog
                :title="`Edit Delivery from ${new Date(
                  slotProps.data.DeliveryDate
                ).toLocaleString()}`"
                :edit="true"
              />
            </template>
          </Column>

          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Products</h5>
              <DataTable
                :value="slotProps.data.Products"
                responsiveLayout="scroll"
              >
                <Column
                  field="productName"
                  header="Name"
                  :sortable="true"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.name }}
                  </template>
                </Column>
                <Column
                  field="productWeight"
                  header="Weight"
                  :sortable="true"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.weight }}
                  </template>
                </Column>
                <Column
                  field="productLevelOfPolution"
                  header="Level Of Polution"
                  :sortable="true"
                >
                  <template #body="slotProps">
                    {{ slotProps.data.levelOfPolution }}
                  </template>
                </Column>
                <Column headerStyle="width:4rem">
                  <template #body="slotProps">
                    <CrudDialog
                      :title="`Edit Product '${slotProps.data.name}'`"
                      :edit="true"
                    />
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
