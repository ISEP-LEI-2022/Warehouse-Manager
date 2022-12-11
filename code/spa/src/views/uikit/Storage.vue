<script setup lang="ts">
import { ref, onMounted } from "vue";
import StorageService from "@/service/StorageService";
import { useLayout } from "@/layout/composables/layout";

const { contextPath } = useLayout();

const expandedRows = ref([]);
const deliveries = ref([]);
const storages = ref([]);
const storageService = new StorageService();

onMounted(() => {
  storageService.getDeliveries().then((data) => (deliveries.value = data));
  storageService.getStorages().then((data) => (storages.value = data));
});
</script>

<template>
  <TabView>
    <TabPanel header="Storages">
      <div class="card">
        <h5>Row Expand</h5>
        <DataTable
          :value="storages"
          v-model:expandedRows="expandedRows"
          dataKey="id"
          responsiveLayout="scroll"
        >
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="slotProps">
              <img
                :src="
                  contextPath + 'demo/images/product/' + slotProps.data.image
                "
                :alt="slotProps.data.image"
                class="shadow-2"
                width="100"
              />
            </template>
          </Column>
          <Column field="price" header="Price" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.price }}
            </template>
          </Column>
          <Column field="category" header="Category" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.category }}
            </template></Column
          >
          <Column field="rating" header="Reviews" :sortable="true">
            <template #body="slotProps">
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column field="inventoryStatus" header="Status" :sortable="true">
            <template #body="slotProps">
              <span
                :class="
                  'product-badge status-' +
                  (slotProps.data.inventoryStatus
                    ? slotProps.data.inventoryStatus.toLowerCase()
                    : '')
                "
                >{{ slotProps.data.inventoryStatus }}</span
              >
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Orders for {{ slotProps.data.name }}</h5>
              <DataTable
                :value="slotProps.data.orders"
                responsiveLayout="scroll"
              >
                <Column field="id" header="Id" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.id }}
                  </template>
                </Column>
                <Column field="customer" header="Customer" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.customer }}
                  </template>
                </Column>
                <Column field="date" header="Date" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.date }}
                  </template>
                </Column>
                <Column field="amount" header="Amount" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.amount }}
                  </template>
                </Column>
                <Column field="status" header="Status" :sortable="true">
                  <template #body="slotProps">
                    <span
                      :class="
                        'order-badge order-' +
                        (slotProps.data.status
                          ? slotProps.data.status.toLowerCase()
                          : '')
                      "
                      >{{ slotProps.data.status }}</span
                    >
                  </template>
                </Column>
                <Column headerStyle="width:4rem">
                  <template #body>
                    <Button icon="pi pi-search" />
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </div>
    </TabPanel>
    <TabPanel header="Deliveries">
      <p class="line-height-3 m-0">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non
        numquam eius modi.
      </p>
    </TabPanel>
  </TabView>
</template>

<style scoped lang="scss">
@import "@/assets/demo/styles/badges.scss";
</style>
