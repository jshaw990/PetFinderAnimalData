import { mount } from '@vue/test-utils'
import StaticFooter from '@/components/AppLayout/StaticFooter.vue'

describe('StaticFooter', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(StaticFooter)
    expect(wrapper.vm).toBeTruthy()
  })
})
