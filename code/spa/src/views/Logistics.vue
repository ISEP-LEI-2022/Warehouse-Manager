<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import CrudDialog from "@/components/CrudDialog.vue";
import type Truck from "@/models/truck";
import type Route from "@/models/route";
import RouteMap from "@/services/mappers/RouteMap";
import TruckMap from "@/services/mappers/TruckMap";
import { useToast } from "primevue/usetoast";
import LogisticsService from "@/services/LogisticsService";

const toast = useToast();
const trucks = ref([] as Truck[]);
const routes = ref([] as Route[]);

const truck_Errors = ref([] as any[]);
const route_Errors =  ref([] as any[]);


const help_truck_fields = ref({ Registration: "Format: XX-00-XX" });
const help_route_fields = ref({
  Distance: "Bigger than 0",
  TimeRequired: "Bigger than 0",
  EnergyConsumed: "Bigger than 0",
  ExtraChargingTime: "Bigger than 0",
});

onBeforeMount(() => {
  LogisticsService.getTrucks((errors: Array<any>)=>{truck_Errors.value.push(errors)}).then((data) => (trucks.value = data));
  LogisticsService.getRoutes((errors: Array<any>)=>{route_Errors.value.push(errors)}).then((data) => (routes.value = data));
});

const addTruck = (truck: Array<any>) => {
  const new_truck = TruckMap.fromAnyArray(truck);
  LogisticsService.createTruck(new_truck).then((response) =>
    processResponse(
      response,
      "Create Truck",
      () => {
        trucks.value.push(new_truck);
      }
    )
  );
};
const updateTruck = () => {
  toast.add({
    severity: "error",
    summary: "Not implemented",
    detail: "Not possible to update Truck yet",
    life: 3000,
  });
};
const addRoute = (route: Array<any>) => {
  const new_route = RouteMap.fromAnyArray(route);
  LogisticsService.createRoute(new_route).then((response) =>
    processResponse(
      response,
      "Create Route",
      () => {
        routes.value.push(new_route);
      }
    )
  );
};
const updateRoute = () => {
  toast.add({
    severity: "error",
    summary: "Not implemented",
    detail: "Not possible to update Route yet",
    life: 3000,
  });
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
    <TabPanel id="trucks-panel" header="Trucks">
      <Toast />
      <CrudDialog
        v-if="truck_Errors?.length == 0"
        title="Add
      new Truck"
        :edit="false"
        :model="TruckMap.empty()"
        :help_text_fields="help_truck_fields"
        :disabled_fields="[]"
        @submit="addTruck"
      />
      <div class="card">
        <Message
          v-for="msg of truck_Errors"
          :severity="msg.severity"
          :key="msg.content"
          >{{ msg.content }}</Message
        >
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
                :title="`Edit Truck '${slotProps.data.Registration}'`"
                :model="slotProps.data"
                :edit="true"
                :help_text_fields="help_truck_fields"
                @submit="updateTruck"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </TabPanel>
    <TabPanel id="routes-panel" header="Routes">
      <Toast />
      <CrudDialog
        v-if="route_Errors?.length == 0"
        title="Add new Route"
        :edit="false"
        :model="RouteMap.empty()"
        :help_text_fields="help_route_fields"
        @submit="addRoute"
      />
      <div class="card">
        <Message
          v-for="msg of route_Errors"
          :severity="msg.severity"
          :key="msg.content"
          >{{ msg.content }}</Message
        >
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
                :title="`Edit Route '${slotProps.data.Route}'`"
                :model="slotProps.data"
                :edit="true"
                :help_text_fields="help_route_fields"
                @submit="updateRoute"
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
