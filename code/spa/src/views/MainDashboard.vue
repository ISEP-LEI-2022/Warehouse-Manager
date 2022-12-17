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
const logisticsService = new LogisticsService();
const storageService = new StorageService();

const formatDate = (value: string) => {
  return new Date(value).toLocaleString();
};

onMounted(() => {
  logisticsService.getTrucks().then((data) => (trucks.value = data));
  logisticsService.getRoutes().then((data) => (routes.value = data));
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
          v-for="msg of logisticsService.Truck_Errors"
          :severity="msg.severity"
          :key="msg.content"
          >{{ msg.content }}</Message
        >
        <DataTable
          :value="trucks"
          :rows="3"
          :paginator="true"
          responsiveLayout="scroll"
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
          v-for="msg of logisticsService.Route_Errors"
          :severity="msg.severity"
          :key="msg.content"
          >{{ msg.content }}</Message
        >
        <DataTable
          :value="routes"
          :rows="3"
          :paginator="true"
          responsiveLayout="scroll"
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
        >
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
        >
          <Column
            field="Designation"
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
