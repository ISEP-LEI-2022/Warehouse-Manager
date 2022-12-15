<script setup lang="ts">
import { ref, onMounted } from "vue";
import LogisticsService from "@/services/LogisticsService";
import CrudDialog from "@/components/CrudDialog.vue";
import Truck from "@/models/truck";
import Route from "@/models/route";

const trucks = ref([] as Truck[]);
const routes = ref([] as Route[]);
const logisticsService = new LogisticsService();

const invalid_truck_fields = ref([]);
const invalid_route_fields = ref([]);

onMounted(() => {
  logisticsService.getTrucks().then((data) => (trucks.value = data));
  logisticsService.getRoutes().then((data) => (routes.value = data));
});

const addTruck = (truck: any) => {
  console.log(truck);
};
const updateTruck = (truck: any) => {
  console.log(truck);
};
const addRoute = (route: any) => {
  console.log(route);
};
const updateRoute = (route: any) => {
  console.log(route);
};
</script>

<template>
  <TabView>
    <TabPanel header="Trucks">
      <CrudDialog
        title="Add new Truck"
        :edit="false"
        :model="new Truck('')"
        :invalid_fields="invalid_truck_fields"
        @submit="addTruck"
      />
      <div class="card">
        <DataTable
          :value="trucks"
          :rows="10"
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
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <CrudDialog
                :title="`Edit Truck '${slotProps.data.registration}'`"
                :model="slotProps.data"
                :invalid_fields="invalid_truck_fields"
                @submit="updateTruck"
                :edit="true"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </TabPanel>
    <TabPanel header="Routes">
      <CrudDialog
        title="Add new Route"
        content=""
        :edit="false"
        :model="new Route('')"
        :invalid_fields="invalid_route_fields"
        @submit="addRoute"
      />
      <div class="card">
        <DataTable
          :value="routes"
          :rows="10"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column field="Route" header="Route" style="width: 15%" />
          <Column
            field="Start"
            header="Start"
            :sortable="true"
            style="width: 15%"
          />
          <Column
            field="End"
            header="End"
            :sortable="true"
            style="width: 10%"
          />
          <Column
            field="Distance"
            header="Distance [km]"
            :sortable="true"
            style="width: 15%"
          />
          <Column
            field="TimeRequired"
            header="Time [min]"
            :sortable="true"
            style="width: 15%"
          />
          <Column
            field="EnergyConsumed"
            header="En.Consumed [kW]"
            :sortable="true"
            style="width: 15%"
          />
          <Column
            field="ExtraChargingTime"
            header="Ex. Ch. Time [min]"
            :sortable="true"
            style="width: 20%"
          />
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <CrudDialog
                :title="`Edit Route '${slotProps.data.idRoute}'`"
                :model="slotProps.data"
                :invalid_fields="invalid_route_fields"
                @submit="updateRoute"
                :edit="true"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </TabPanel>
  </TabView>
</template>

<style scoped lang="scss">
@import "@/assets/demo/styles/badges.scss";
</style>
