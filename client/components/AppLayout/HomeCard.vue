<template>
  <v-col cols="12" md="6">
    <v-card
      height="250px"
      class="d-flex flex-column justify-center align-center"
      :to="linkTo"
    >
      <v-icon v-if="icon.length > 0" size="80px" class="mb-4">
        {{ icon }}
      </v-icon>
      <div class="text-h5">
        {{ titleText }}
      </div>
      <div v-if="bodyText.length > 0" class="mt-4">
        {{ bodyText }}
      </div>
    </v-card>
  </v-col>
</template>

<script lang='ts'>
export default {
  name: 'HomeCard',
  props: {
    titleText: {
      type: String,
      required: true
    },
    bodyText: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    linkTo: {
      type: String,
      required: true
    }
  }
}
</script>
