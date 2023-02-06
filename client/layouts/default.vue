<template>
  <v-app dark>
    <StaticHeader />
    <v-main>
      <Nuxt />
    </v-main>
    <StaticFooter />
  </v-app>
</template>

<script>
import { onMounted } from 'vue'
import StaticFooter from '../components/AppLayout/StaticFooter.vue'
import StaticHeader from '../components/AppLayout/StaticHeader.vue'

import useAnimals from '../data/animals'

export default {
  name: 'DefaultLayout',
  components: { StaticFooter, StaticHeader },
  setup () {
    const { loadAllAnimals } = useAnimals()

    onMounted(() => {
      loadAllAnimals()
    })
  }
}
</script>
