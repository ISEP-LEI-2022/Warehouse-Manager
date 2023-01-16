<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import CrudDialog from "@/components/CrudDialog.vue";
import type Truck from "@/models/truck";
import Route from "@/models/route";
import RouteMap from "@/services/mappers/RouteMap";
import TruckMap from "@/services/mappers/TruckMap";
import { useToast } from "primevue/usetoast";
import LogisticsService from "@/services/LogisticsService";
import type Trip from "@/models/trip";

const toast = useToast();
const trucks = ref([] as Truck[]);
const routes = ref([] as Route[]);
const trips = ref([] as Trip[]);
const truck_Errors = ref([] as any[]);
const route_Errors = ref([] as any[]);
const trip_Errors = ref([] as any[]);
const expandedRows = ref([]);
const optimizedTrip = ref([] as Trip[]);

const selectedDate = ref(null);
const selectedTruck = ref(null);
const autoFilteredValue = ref([] as any[]);
const loading = ref(false);

const help_truck_fields = ref({ Registration: "Format: XX-00-XX" });
const help_route_fields = ref({
  Distance: "Bigger than 0",
  TimeRequired: "Bigger than 0",
  EnergyConsumed: "Bigger than 0",
  ExtraChargingTime: "Bigger than 0",
});

var pageRoutes = 1;
const perPageRoutes = 2;
const totalRecordsRoutes = ref(0);

var pageTrips = 1;
const perPageTrips = 2;
const totalRecordsTrips = ref(0);

onBeforeMount(() => {
  LogisticsService.getTrucks((errors: Array<any>) => {
    truck_Errors.value.push(errors);
  }).then((data) => (trucks.value = data));
  LogisticsService.getRoutesPagination(
    pageRoutes,
    perPageRoutes,
    (errors: Array<any>) => {
      route_Errors.value.push(errors);
    }
  ).then((data) => {
    (routes.value = data.routesList),
      (totalRecordsRoutes.value = data.totalRecords);
  });
});

const addTruck = (truck: Array<any>) => {
  const new_truck = TruckMap.fromAnyArray(truck);
  LogisticsService.createTruck(new_truck).then((response) =>
    processResponse(response, "Create Truck", () => {
      trucks.value.push(new_truck);
      totalRecordsRoutes.value += 1;
    })
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
const searchTruck = (event: any) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      autoFilteredValue.value = [...trucks.value];
    } else {
      autoFilteredValue.value = trucks.value.filter((truck) => {
        return truck.Registration.toLowerCase().startsWith(
          event.query.toLowerCase()
        );
      });
    }
  }, 250);
};
const addRoute = (route: Array<any>) => {
  const new_route = RouteMap.fromAnyArray(route);
  LogisticsService.createRoute(new_route).then((response) =>
    processResponse(response, "Create Route", () => {
      routes.value.push(new_route);
    })
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
  onError: Function = () => {}
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
const searchTrip = () => {
  loading.value = true;
  LogisticsService.getTrips(
    selectedTruck.value?.Registration,
    selectedDate?.value,
    (errors: Array<any>) => {
      trip_Errors.value.push(errors);
    }
  ).then((data) => (trips.value = data));
  setTimeout(() => (loading.value = false), 500);
};

// Não relevante aplicar pois cada truck apenas faz uma viagem por dia
// const searchTrip = () => {
//   loading.value = true;
//   LogisticsService.getTripsPagination(
//     selectedTruck.value?.Registration,
//     selectedDate?.value,
//     pageTrips,
//     perPageTrips,
//     (errors: Array<any>) => {
//       trip_Errors.value.push(errors);
//     }
//   ).then((data) => {
//     (trips.value = data.tripsList),
//       (totalRecordsTrips.value = data.totalRecords);
//   });
//   setTimeout(() => (loading.value = false), 500);
// };

const asyncsearchTrip = function searchTrip(
  registration: string | null,
  date: Date | null
) {
  if (registration == null || date == null) {
    return;
  }
  loading.value = true;
  LogisticsService.getTrips(registration, date, (errors: Array<any>) => {
    trip_Errors.value.push(errors);
  }).then((data) => (trips.value = data));
  optimizedTrip.value = [];
  setTimeout(() => (loading.value = false), 500);
};

const onPageRoutes = (event) => {
  pageRoutes = event.page + 1;
  LogisticsService.getRoutesPagination(
    pageRoutes,
    perPageRoutes,
    (errors: Array<any>) => {
      route_Errors.value.push(errors);
    }
  ).then((data) => {
    (routes.value = data.routesList),
      (totalRecordsRoutes.value = data.totalRecords);
  });
};

const onPageTrips = (event) => {
  pageTrips = event.page + 1;
  LogisticsService.getTripsPagination(
    selectedTruck.value?.Registration,
    selectedDate?.value,
    pageTrips,
    perPageTrips,
    (errors: Array<any>) => {
      route_Errors.value.push(errors);
    }
  ).then((data) => {
    (trips.value = data.tripsList),
      (totalRecordsTrips.value = data.totalRecords);
  });
};

const asyncUpdateActiveStatus = function updateStatus(
  registration: string,
  self: Truck
) {
  loading.value = true;
  LogisticsService.updateActiveStatus(registration, (errors: Array<any>) => {
    trip_Errors.value.push(errors);
  })
    .then((data) => (self.Active = !!data?.Active))
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Not possible to update active status",
        detail: error,
        life: 3000,
      });
    });
  loading.value = false;
};

const asyncOptimizeTrip = function optimizeRoute(
  registration: string | null,
  date: Date | null
) {
  loading.value = true;
  if (registration == null || date == null) {
    return;
  }
  LogisticsService.optimizeTrip(registration, date, (errors: Array<any>) => {
    trip_Errors.value.push(errors);
  })
    .then((data) => (optimizedTrip.value = data))
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Not possible to optimize route",
        detail: error,
        life: 3000,
      });
    });
  loading.value = false;
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
            style="width: 20%"
          ></Column>
          <Column
            field="Tare"
            header="Tare [kg]"
            :sortable="true"
            style="width: 20%"
          ></Column>
          <Column
            field="active"
            header="Status"
            dataType="boolean"
            style="width: 10%"
          >
            <template #body="{ data }">
              <span class="p-column-title">Active Status</span>
              <span
                v-on:mouseover=""
                class="p-column-body"
                v-on:click="
                  asyncUpdateActiveStatus(data.Registration, data as Truck)
                "
              >
                <span
                  class="p-tag"
                  :class="{
                    'p-tag-success': data.Active,
                    'p-tag-danger': !data.Active,
                  }"
                >
                  <i
                    v-if="data.Active"
                    class="pi pi-check cursor-pointer"
                    style="font-size: 1rem"
                  ></i>
                  <i
                    v-else
                    class="pi pi-times cursor-pointer"
                    style="font-size: 1rem"
                  ></i>
                </span>
              </span>
            </template>
          </Column>
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
        <DataTable :value="routes" :rows="10" responsiveLayout="scroll">
          <template #empty> No routes found. </template>
          <template #loading> Loading routes data. Please wait. </template>
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
        <div v-if="totalRecordsRoutes > 0">
          <Paginator
            :rows="perPageRoutes"
            :totalRecords="totalRecordsRoutes"
            @page="onPageRoutes($event)"
          ></Paginator>
        </div>
      </div>
    </TabPanel>
    <TabPanel id="trips-panel" header="Trips">
      <div class="card">
        <AutoComplete
          placeholder="Search"
          id="dd"
          :dropdown="true"
          :multiple="false"
          v-model="selectedTruck"
          :suggestions="autoFilteredValue"
          @complete="searchTruck($event)"
          field="Registration"
          style="margin-right: 1rem"
        />
        <Calendar
          :showIcon="true"
          :showButtonBar="true"
          v-model="selectedDate"
          style="margin-right: 1rem"
        />
        <Button
          type="button"
          label="Search"
          icon="pi pi-search"
          :loading="loading"
          @click="searchTrip"
        />
      </div>
      <div class="card">
        <DataTable
          :value="trips"
          :rows="10"
          :paginator="true"
          v-model:expandedRows="expandedRows"
          dataKey="idTrip"
          responsiveLayout="scroll"
        >
          <template #empty> No trips found. </template>
          <template #loading> Loading trips data. Please wait. </template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="date" header="Date" :sortable="true">
            <template #body="slotProps">
              {{ new Date(slotProps.data.date).toLocaleDateString() }}
            </template>
          </Column>
          <Column field="registration" header="Registration" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.registration }}
            </template>
          </Column>
          <Column field="idTrip" header="Description">
            <template #body="slotProps">
              {{ slotProps.data.idTrip }}
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Routes</h5>
              <DataTable
                :value="slotProps.data.routes"
                responsiveLayout="scroll"
              >
                <Column field="idStart" header="Start" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.idStart }}
                  </template>
                </Column>
                <Column field="idEnd" header="End" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.idEnd }}
                  </template>
                </Column>
              </DataTable>
            </div>
            <div class="p-3">
              <h5>Deliveries</h5>
              <DataTable
                :value="slotProps.data.deliveries"
                responsiveLayout="scroll"
              >
                <Column header="Package" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data }}
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
        <div v-if="totalRecordsTrips > 0">
          <Paginator
            :rows="perPageTrips"
            :totalRecords="totalRecordsTrips"
            @page="onPageTrips($event)"
          ></Paginator>
        </div>
      </div>
    </TabPanel>
    <TabPanel id="optimization-panel" header="Optimization">
      <div class="card w-12">
        <AutoComplete
          placeholder="Search"
          id="dd"
          :dropdown="true"
          :multiple="false"
          v-model="selectedTruck"
          :suggestions="autoFilteredValue"
          @complete="searchTruck($event)"
          field="Registration"
          style="margin-right: 1rem"
        />
        <Calendar
          :showIcon="true"
          :showButtonBar="true"
          v-model="selectedDate"
          style="margin-right: 1rem"
        />
        <Button
          type="button"
          label="Search"
          icon="pi pi-search"
          :loading="loading"
          @click="asyncsearchTrip(selectedTruck?.Registration, selectedDate)"
        />
      </div>
      <div class="w-12 flex card-container card">
        <div class="w-5">
          <DataTable
            :value="trips"
            :rows="10"
            :paginator="true"
            v-model:expandedRows="expandedRows"
            dataKey="idTrip"
            responsiveLayout="scroll"
          >
            <template #empty> No trips found. </template>
            <template #loading> Loading trips data. Please wait. </template>
            <Column field="Routes" header="Routes" :sortable="false">
              <template #body="slotProps">
                <DataTable
                  :value="slotProps.data.routes"
                  responsiveLayout="scroll"
                >
                  <Column field="idStart" header="Start" :sortable="false">
                    <template #body="slotProps">
                      {{ slotProps.data.idStart }}
                    </template>
                  </Column>
                  <Column field="idEnd" header="End" :sortable="false">
                    <template #body="slotProps">
                      {{ slotProps.data.idEnd }}
                    </template>
                  </Column>
                </DataTable>
              </template>
            </Column>
          </DataTable>
        </div>
        <Button
          type="button"
          label="Optimize"
          id="optimize"
          icon="pi pi-step-forward"
          class="w-1"
          :loading="loading"
          @click="asyncOptimizeTrip(selectedTruck?.Registration, selectedDate)"
        />
        <div class="w-5">
          <DataTable
            :value="optimizedTrip"
            :rows="10"
            :paginator="true"
            v-model:expandedRows="expandedRows"
            dataKey="idTrip"
            responsiveLayout="scroll"
          >
            <template #empty> Not yet optimized. </template>
            <template #loading> Loading trips data. Please wait. </template>
            <Column field="Routes" header="Routes" :sortable="false">
              <template #body="slotProps">
                <DataTable
                  :value="slotProps.data.routes"
                  responsiveLayout="scroll"
                >
                  <Column field="idStart" header="Start" :sortable="false">
                    <template #body="slotProps">
                      {{ slotProps.data.idStart }}
                    </template>
                  </Column>
                  <Column field="idEnd" header="End" :sortable="false">
                    <template #body="slotProps">
                      {{ slotProps.data.idEnd }}
                    </template>
                  </Column>
                </DataTable>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </TabPanel>
  </TabView>
</template>

<style scoped lang="scss">
@import "@/assets/demo/styles/badges.scss";
</style>
