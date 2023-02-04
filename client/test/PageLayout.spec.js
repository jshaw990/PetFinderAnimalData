import { mount } from '@vue/test-utils'
import PageLayout from '@/components/AppLayout/PageLayout.vue'

describe('PageLayout', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(PageLayout)
    expect(wrapper.vm).toBeTruthy()
  })
})
