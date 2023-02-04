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
import StaticFooter from '../components/AppLayout/StaticFooter.vue'
import StaticHeader from '../components/AppLayout/StaticHeader.vue'

export default {
  name: 'DefaultLayout',
  components: { StaticFooter, StaticHeader }
}
</script>
