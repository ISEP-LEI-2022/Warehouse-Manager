<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import StorageService from "@/services/StorageService";
import CrudDialog from "@/components/CrudDialog.vue";
import StorageMap from "@/services/mappers/StorageMap";
import type Storage from "@/models/storage";

const expandedRows = ref([]);
const deliveries = ref([]);
const storages = ref([] as Storage[]);
const storageService = new StorageService();

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
});
</script>

<template>
  <TabView>
    <TabPanel header="Storages">
      <CrudDialog title="Add new Storage" content="" :edit="false" />
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
                
                slotProps.data.Location.address.street +", "+ slotProps.data.Location.address.city.name + ", " + slotProps.data.Location.address.postalCode
                
              }}
            </template>
          </Column>
          <Column field="location" header="Location" :sortable="true">
            <template #body="slotProps">
              {{
                `(${slotProps.data.Location.Latitude},${slotProps.data.Location.Latitude},${slotProps.data.Location.Latitude})`
              }}
            </template>
          </Column>
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <CrudDialog
                :title="`Edit Storage '${slotProps.data.designation}'`"
                :edit="true"
              />
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Charging Systems</h5>
              <DataTable
                :value="slotProps.data.chargingSystems"
                responsiveLayout="scroll"
              >
                <Column field="id" header="Id" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.id.value }}
                  </template>
                </Column>
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
                      :title="`Edit Charging System '${slotProps.data.id.value}'`"
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
      <CrudDialog title="Add new Storage" content="" :edit="false" />
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
              {{ new Date(slotProps.data.deliveryDate).toLocaleString() }}
            </template>
          </Column>
          <Column field="deliveryWeight" header="Weight [kg]" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.deliveryWeight }}
            </template>
          </Column>
          <Column field="finalStorageId" header="Final Storage">
            <template #body="slotProps">
              <a href="#/uikit/storage">
                {{
                  storages.find((item) => {
                    return item?.id == slotProps.data.finalStorageId;
                  })?.designation
                }}
              </a>
            </template>
          </Column>
          <Column field="timeToLoad" header="Time To Load [min]">
            <template #body="slotProps">
              {{ slotProps.data.timeToLoad }}
            </template>
          </Column>
          <Column field="timeToUnload" header="Time To Unload [min]">
            <template #body="slotProps">
              {{ slotProps.data.timeToUnload }}
            </template>
          </Column>
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <CrudDialog
                :title="`Edit Delivery from ${new Date(
                  slotProps.data.deliveryDate
                ).toLocaleString()}`"
                :edit="true"
              />
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Products</h5>
              <DataTable
                :value="slotProps.data.products"
                responsiveLayout="scroll"
              >
                <Column field="name" header="Name" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.name }}
                  </template>
                </Column>
                <Column field="weight" header="Weight [kg]" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.weight }}
                  </template>
                </Column>
                <Column
                  field="levelOfPolution"
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
