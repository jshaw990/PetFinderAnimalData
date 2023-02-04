import { mount } from '@vue/test-utils'
import AggregateDataPage from '@/pages/data/index.vue'

describe('AggregateDataPage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AggregateDataPage)
    expect(wrapper.vm).toBeTruthy()
  })
})
