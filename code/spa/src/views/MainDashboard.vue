<script setup lang="ts">
import { onMounted, ref } from "vue";
import LogisticsService from "@/services/LogisticsService";
import StorageService from "@/services/StorageService";
import CardItem from "@/components/CardItem.vue";
import type Truck from "@/models/truck";
import type Route from "@/models/route";
import type Storage from "@/models/storage";
import type Delivery from "@/models/delivery";

const trucks = ref([] as Truck[]);
const routes = ref([] as Route[]);
const deliveries = ref([] as Delivery[]);
const storages = ref([] as Storage[]);

const truck_Errors = ref([] as any[]);
const route_Errors = ref([] as any[]);

const storageService = new StorageService();

const formatDate = (value: string) => {
  return new Date(value).toLocaleString();
};

onMounted(() => {
  LogisticsService.getTrucks((errors: Array<any>) => {
    truck_Errors.value.push(errors);
  }).then((data) => (trucks.value = data));
  LogisticsService.getRoutes((errors: Array<any>) => {
    route_Errors.value.push(errors);
  }).then((data) => (routes.value = data));
  storageService.getDeliveries().then((data) => (deliveries.value = data));
  storageService.getStorages().then((data) => (storages.value = data));
});
</script>

<template>
  <div class="grid">
    <CardItem title="Trucks" :content="String(trucks.length)" />
    <CardItem title="Routes" :content="String(routes.length)" />
    <CardItem title="Deliveries" :content="String(deliveries.length)" />
    <CardItem title="Storages" :content="String(storages.length)" />
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Trucks</h5>
        <Message
          v-for="msg of truck_Errors"
          :severity="msg.severity"
          :key="msg.content"
          >{{ msg.content }}</Message
        >
        <DataTable
          :value="trucks"
          :rows="3"
          :paginator="true"
          responsiveLayout="scroll"
          id="trucks-table"
        >
          <template #empty> No truck found. </template>
          <template #loading> Loading truck data. Please wait. </template>
          <Column
            field="Registration"
            header="Registration"
            style="width: 25%"
          ></Column>
          <Column
            field="Autonomy"
            header="Autonomy [min]"
            :sortable="true"
            style="width: 25%"
          ></Column>
          <Column
            field="Capacity"
            header="Capacity [kg]"
            :sortable="true"
            style="width: 30%"
          ></Column>
          <Column
            field="Tare"
            header="Tare [kg]"
            :sortable="true"
            style="width: 20%"
          ></Column>
          <Column
            field="Active"
            header="Status"
            dataType="boolean"
            style="width: 10%"
          >
            <template #body="{ data }">
              <span class="p-column-title">Active Status</span>
              <span class="p-column-body">
                <span
                  class="p-tag"
                  :class="{
                    'p-tag-success': data.Active,
                    'p-tag-danger': !data.Active,
                  }"
                >
                  <i
                    v-if="data.Active"
                    class="pi pi-check"
                    style="font-size: 1rem"
                  ></i>
                  <i
                    v-else
                    class="pi pi-times"
                    style="font-size: 1rem"
                  ></i>
                </span>
              </span>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="card">
        <h5>Routes</h5>
        <Message
          v-for="msg of route_Errors"
          :severity="msg.severity"
          :key="msg.content"
          >{{ msg.content }}</Message
        >
        <DataTable
          :value="routes"
          :rows="3"
          :paginator="true"
          responsiveLayout="scroll"
          id="routes-table"
        >
          <template #empty> No route found. </template>
          <template #loading> Loading route data. Please wait. </template>
          <Column field="Route" header="Route" style="width: 15%" />
          <Column
            field="Start"
            header="Start"
            :sortable="true"
            style="width: 20%"
          />
          <Column
            field="End"
            header="End"
            :sortable="true"
            style="width: 20%"
          />
          <Column
            field="Distance"
            header="Distance [km]"
            :sortable="true"
            style="width: 25%"
          />
          <Column
            field="TimeRequired"
            header="Time [min]"
            :sortable="true"
            style="width: 20%"
          />
        </DataTable>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Deliveries</h5>
        <DataTable
          :value="deliveries"
          :rows="3"
          :paginator="true"
          responsiveLayout="scroll"
          id="deliveries-table"
        >
          <template #empty> No deliveries found. </template>
          <template #loading> Loading deliveries data. Please wait. </template>
          <Column header="Date">
            <template #body="{ data }">
              {{ formatDate(data.DeliveryDate) }}
            </template>
          </Column>
          <Column
            field="DeliveryWeight"
            header="Weight [T]"
            :sortable="true"
            style="width: 20%"
          />
          <Column
            field="TimeToLoad"
            header="Load [min]"
            :sortable="true"
            style="width: 25%"
          />
          <Column
            field="TimeToUnload"
            header="Unload [min]"
            :sortable="true"
            style="width: 25%"
          />
        </DataTable>
      </div>
      <div class="card">
        <h5>Storages</h5>
        <DataTable
          :value="storages"
          :rows="3"
          :paginator="true"
          responsiveLayout="scroll"
          id="storages-table"
        >
          <template #empty> No storages found. </template>
          <template #loading> Loading storages data. Please wait. </template>
          <Column
            field="Designation"
            header="Designation"
            style="width: 35%"
          ></Column>
          <Column
            field="Name"
            header="Location"
            :sortable="true"
            style="width: 35%"
          ></Column>
          <Column
            field="Chargingsystems"
            header="Charging Systems"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ `(${slotProps.data.Chargingsystems.length})` }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
