import { mount } from '@vue/test-utils'
import AnimalTable from '@/components/AnimalTable.vue'

describe('AnimalTable', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AnimalTable)
    expect(wrapper.vm).toBeTruthy()
  })
})
