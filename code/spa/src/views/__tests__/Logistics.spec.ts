import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Logistics from "../Logistics.vue";

describe("CrudDialog", () => {
  it("renders properly", () => {
    const wrapper = mount(Logistics, {
      props: {},
    });
    expect(wrapper.text()).toMatchSnapshot();
  });
});
