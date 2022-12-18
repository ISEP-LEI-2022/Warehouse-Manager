<script setup lang="ts">
import { onMounted, ref } from "vue";
import LogisticsService from "@/services/LogisticsService";
import StorageService from "@/services/StorageService";
import CardItem from "@/components/CardItem.vue";
import type Truck from "@/models/truck";
import type Route from "@/models/route";

const trucks = ref([] as Truck[]);
const routes = ref([] as Route[]);
const deliveries = ref([]);
const storages = ref([]);
const truck_Errors = ref([] as any[]);
const route_Errors =  ref([] as any[]);


const storageService = new StorageService();

const formatDate = (value: string) => {
  return new Date(value).toLocaleString();
};

onMounted(() => {
  LogisticsService.getTrucks((errors: Array<any>)=>{truck_Errors.value.push(errors)}).then((data) => (trucks.value = data));
  LogisticsService.getRoutes((errors: Array<any>)=>{route_Errors.value.push(errors)}).then((data) => (routes.value = data));
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
          <Column header="Date">
            <template #body="{ data }">
              {{ formatDate(data.deliveryDate) }}
            </template>
          </Column>
          <Column
            field="deliveryWeight"
            header="Weight [T]"
            :sortable="true"
            style="width: 20%"
          />
          <Column
            field="timeToLoad"
            header="Load [min]"
            :sortable="true"
            style="width: 25%"
          />
          <Column
            field="timeToUnload"
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
          <Column
            field="designation"
            header="Designation"
            style="width: 35%"
          ></Column>
          <Column
            field="location.address.street"
            header="Location"
            :sortable="true"
            style="width: 35%"
          ></Column>
          <Column
            field="chargingSystems.count"
            header="Charging Systems"
            :sortable="true"
            style="width: 35%"
          >
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
