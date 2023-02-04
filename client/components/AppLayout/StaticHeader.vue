<template>
  <v-app-bar max-height="64px">
    <nuxt-link to="/">
      <v-app-bar-title>
        Pet Finder Animal Data
      </v-app-bar-title>
    </nuxt-link>
    <v-spacer />
    <div class="d-flex flex-row align-center">
      <nuxt-link to="/data" class="mx-2">
        Aggregate Data
      </nuxt-link>
      <nuxt-link to="/animal_list" class="mx-2">
        Animal List
      </nuxt-link>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'StaticHeader'
}
</script>
