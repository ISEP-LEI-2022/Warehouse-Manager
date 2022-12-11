<script setup lang="ts">
import { onMounted, ref } from "vue";
import LogisticsService from "@/service/LogisticsService";
import StorageService from "@/service/StorageService";
import CardItem from "@/components/CardItem.vue";


const trucks = ref([]);
const routes = ref([]);
const deliveries = ref([]);
const storages = ref([]);
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
        <DataTable
          :value="trucks"
          :rows="3"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column
            field="registration"
            header="Registration"
            style="width: 25%"
          ></Column>
          <Column
            field="autonomy"
            header="Autonomy [min]"
            :sortable="true"
            style="width: 25%"
          ></Column>
          <Column
            field="capacity"
            header="Capacity [kg]"
            :sortable="true"
            style="width: 30%"
          ></Column>
          <Column
            field="tare"
            header="Tare [kg]"
            :sortable="true"
            style="width: 20%"
          ></Column>
        </DataTable>
      </div>
      <div class="card">
        <h5>Routes</h5>
        <DataTable
          :value="routes"
          :rows="3"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column field="idRoute" header="Route" style="width: 15%" />
          <Column
            field="idStart"
            header="Start"
            :sortable="true"
            style="width: 20%"
          />
          <Column
            field="idEnd"
            header="End"
            :sortable="true"
            style="width: 20%"
          />
          <Column
            field="distance"
            header="Distance [km]"
            :sortable="true"
            style="width: 25%"
          />
          <Column
            field="timeRequired"
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
