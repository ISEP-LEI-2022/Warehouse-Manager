import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";
import Logistics from "../Logistics.vue";
import { useToast } from "primevue/usetoast";
import PrimeVue from 'primevue/config';

describe("Logistics", () => {
  it("renders properly", () => {
    const wrapper = mount(Logistics, {
      props: {},
      global: {
        components: { useToast },
        plugins: [PrimeVue],
      },
    });
  });
});
