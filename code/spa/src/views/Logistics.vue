<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import LogisticsService from "@/services/LogisticsService";
import CrudDialog from "@/components/CrudDialog.vue";
import Truck from "@/models/truck";
import Route from "@/models/route";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const trucks = ref([] as Truck[]);
const routes = ref([] as Route[]);
const logisticsService = new LogisticsService();

const help_truck_fields = ref({ Registration: "Format: XX-00-XX" });
const help_route_fields = ref([]);
const required_truck_fields = ref([]);
const required_route_fields = ref([]);
const disabled_truck_fields = ref(["Registration"]);
const disabled_route_fields = ref([]);

onBeforeMount(() => {
  logisticsService.getTrucks().then((data) => (trucks.value = data));
  logisticsService.getRoutes().then((data) => (routes.value = data));
});

const addTruck = (truck: Array<any>) => {
  let obj = Object.assign({}, ...truck.map((x) => ({ [x.name]: x.value })));

  const new_truck = new Truck();
  new_truck.Registration = obj.Registration;
  new_truck.Capacity = obj.Capacity;
  new_truck.Autonomy = obj.Autonomy;
  new_truck.Tare = obj.Tare;
  logisticsService.createTruck(new_truck).then((response) =>
    processResponse(
      response,
      "Create Truck",
      () => {
        trucks.value.push(new_truck);
      },
      () => {}
    )
  );
};
const updateTruck = (truck: Array<any>) => {
  console.log(truck);
};

const addRoute = (route: Array<any>) => {
  let obj = Object.assign({}, ...route.map((x) => ({ [x.name]: x.value })));
  const new_route = new Route();
  new_route.Route = obj.Route;
  new_route.Start = obj.Start;
  new_route.End = obj.End;
  new_route.Distance = obj.Distance;
  new_route.TimeRequired = obj.TimeRequired;
  new_route.EnergyConsumed = obj.EnergyConsumed;
  new_route.ExtraChargingTime = obj.ExtraChargingTime;
  logisticsService.createRoute(new_route).then((response) =>
    processResponse(
      response,
      "Create Route",
      () => {
        routes.value.push(new_route);
      },
      () => {}
    )
  );
};
const updateRoute = (route: any) => {
  console.log(route);
};

const processResponse = (
  resp: any,
  message: string = "",
  onSuccess: Function,
  onError: Function
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
    <TabPanel header="Trucks">
      <Toast />
      <CrudDialog
        v-if="logisticsService.Truck_Errors.length == 0"
        title="Add
      new Truck"
        :edit="false"
        :model="new Truck()"
        :help_text_fields="help_truck_fields"
        :required_fields="required_truck_fields"
        :disabled_fields="[]"
        @submit="addTruck"
      />
      <div class="card">
        <Message
          v-for="msg of logisticsService.Truck_Errors"
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
                :required_fields="required_truck_fields"
                :disabled_fields="disabled_truck_fields"
                @submit="updateTruck"
                :edit="true"
                :help_text_fields="help_truck_fields"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </TabPanel>
    <TabPanel header="Routes">
      <Toast />
      <CrudDialog
        v-if="logisticsService.Route_Errors.length == 0"
        title="Add new Route"
        :edit="false"
        :model="new Route()"
        :required_fields="required_route_fields"
        :disabled_fields="disabled_route_fields"
        :help_text_fields="help_route_fields"
        @submit="addRoute"
      />
      <div class="card">
        <Message
          v-for="msg of logisticsService.Route_Errors"
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
                :disabled_fields="disabled_route_fields"
                @submit="updateRoute"
                :edit="true"
                :help_text_fields="help_route_fields"
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
