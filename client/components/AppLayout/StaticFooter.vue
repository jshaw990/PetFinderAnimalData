<template>
  <v-footer paddless>
    <v-col cols="12" class="mx-0 px-0">
      <div class="d-flex flex-column flex-md-row justify-space-between align-center text-body-2">
        <div>Jayden Shaw &#169; 2023</div>
        <div>
          All data is provided by the free <a href="https://www.petfinder.com/developers/v2/docs/" target="_blank">PetFinder API
          </a>
        </div>
      </div>
    </v-col>
  </v-footer>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'StaticFooter',
  setup (_, context) {
    const state = reactive({
      dark: true,
      links: [
        {
          title: 'Github',
          url: 'https://github.com/jshaw990'
        },
        {
          title: 'LinkedIn',
          url: 'https://www.linkedin.com/in/jayden-shaw'
        }
      ]
    })

    const getCurrentYear = () => {
      const year = new Date().getFullYear()

      return year
    }

    const handleThemeIcon = () => {
      if (state.dark) {
        return 'mdi-weather-night'
      } else {
        return 'mdi-white-balance-sunny'
      }
    }

    const switchTheme = () => {
      context.root.$vuetify.theme.dark = !context.root.$vuetify.theme.dark
      state.dark = context.root.$vuetify.theme.dark
    }

    return {
      getCurrentYear,
      handleThemeIcon,
      switchTheme,
      ...toRefs(state)
    }
  }
}
</script>
