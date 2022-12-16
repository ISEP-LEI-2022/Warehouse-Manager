import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CrudDialog from '../CrudDialog.vue'
import TruckMap from '@/services/mappers/TruckMap'


describe('CrudDialog', () => {
  it('renders properly', () => {
    const wrapper = mount(CrudDialog,
      {
        props:
        {
          title: "Add Truck",
          edit: false,
          model: TruckMap.empty(),
          help_text_fields: {},
        }
    }
    )
    expect(wrapper.find('button').exists())
    expect(wrapper.find('#pv_id_27_header').exists())
    expect(wrapper.text()).toMatchSnapshot()
  })
})
