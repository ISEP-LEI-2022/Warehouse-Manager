<script setup lang="ts">
import { ref, onMounted } from "vue";
import LogisticsService from "@/services/LogisticsService";
import CrudDialog from "../../components/CrudDialog.vue";
import Truck from "../../models/truck";

const trucks = ref([]);
const routes = ref([]);
const logisticsService = new LogisticsService();

onMounted(() => {
  logisticsService.getTrucks().then((data) => (trucks.value = data));
  logisticsService.getRoutes().then((data) => (routes.value = data));
});
</script>

<template>
  <TabView>
    <TabPanel header="Trucks">
      <CrudDialog title="Add new Truck" content="" :edit="false" />
      <div class="card">
        <DataTable
          :value="trucks"
          :rows="10"
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
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <CrudDialog
                :title="`Edit Truck '${slotProps.data.registration}'`"
                content=""
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
        :model="Truck"
      />
      <div class="card">
        <DataTable
          :value="routes"
          :rows="10"
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
          <Column headerStyle="width:4rem">
            <template #body="slotProps">
              <CrudDialog
                :title="`Edit Route '${slotProps.data.idRoute}'`"
                content=""
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
