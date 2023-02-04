<template>
  <PageLayout>
    <AnimalTable />
  </PageLayout>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import PageLayout from '../../components/AppLayout/PageLayout.vue'
import AnimalTable from '@/components/AnimalTable.vue'
import useAnimals from '@/data/animals'

export default {
  name: 'AnimalListPage',
  components: { AnimalTable, PageLayout },
  setup () {
    const { animalList, isAnimalStateLoaded, loadAllAnimals } = useAnimals()
    const state = reactive({
      animalList: []
    })

    onMounted(() => {
      loadAllAnimals()

      state.animalList = animalList.value
    })

    return {
      isAnimalStateLoaded,
      ...toRefs(state)
    }
  }
}
</script>
