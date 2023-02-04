import { mount } from '@vue/test-utils'
import AnimalListPage from '@/pages/animal_list/index.vue'

describe('AnimalListPage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AnimalListPage)
    expect(wrapper.vm).toBeTruthy()
  })
})
