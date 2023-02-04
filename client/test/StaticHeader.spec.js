import { mount } from '@vue/test-utils'
import StaticHeader from '@/components/AppLayout/StaticHeader.vue'

describe('StaticHeader', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(StaticHeader)
    expect(wrapper.vm).toBeTruthy()
  })
})
