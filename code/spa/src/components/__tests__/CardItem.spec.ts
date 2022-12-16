import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardItem from '../CardItem.vue'


describe('CrudDialog', () => {
  it('renders properly', () => {
    const wrapper = mount(CardItem,
      {
        props:
        {
          title: "CardItem test",
          content: "Hello this is a CardItem test",
        }
    }
    )
    expect(wrapper.text()).toMatchSnapshot()
  })
})
