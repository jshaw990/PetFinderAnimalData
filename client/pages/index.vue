<template>
  <PageLayout>
    <div class="d-flex flex-row flex-wrap justify-space-between">
      <HomeCard
        :title-text="'Animal List'"
        :body-text="'Checkout a list of animals available for adoption'"
        :icon="'mdi-dog'"
        :link-to="'/animal_list'"
      />
      <HomeCard
        :title-text="'Aggregate Data'"
        :body-text="'Checkout data regarding available animals'"
        :icon="'mdi-chart-bar'"
        :link-to="'/data'"
      />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../components/AppLayout/PageLayout.vue'
import HomeCard from '../components/AppLayout/HomeCard.vue'
import useAnimals from '@/data/animals'

export default {
  name: 'IndexPage',
  components: { PageLayout, HomeCard },
  setup () {
    const { isAnimalStateLoaded } = useAnimals()

    return {
      isAnimalStateLoaded
    }
  }
}
</script>
