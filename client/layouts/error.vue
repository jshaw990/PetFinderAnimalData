<template>
  <v-app dark>
    <PageLayout>
      <v-card height="300px" width="80%" class="mx-auto">
        <div class="d-flex flex-column justify-center align-center" style="height: 100%;">
          <div>An error has occured.</div>
          <div class="my-8">
            Please try again
          </div>
          <div>
            <v-btn link class="mx-4" @click="$router.go(-1)">
              Go back
            </v-btn>
            <v-btn link to="/" class="mx-4">
              Home page
            </v-btn>
          </div>
        </div>
      </v-card>
    </PageLayout>
  </v-app>
</template>

<script>
import PageLayout from '../components/AppLayout/PageLayout.vue'

export default {
  name: 'EmptyLayout',
  components: { PageLayout },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
