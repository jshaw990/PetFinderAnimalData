<template>
  <div class="mx-2 mx-md-8">
    <div class="d-flex flex-row justify-space-between align-center">
      <div class="text-h6">
        Animals
      </div>
      <v-btn icon class="my-4" @click="handleAnimalRefresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <v-data-table
      class="animalListTable"
      :headers="headers"
      :items="animalList"
      :items-per-page="20"
      :item-key="uuid()"
      :loading="!isAnimalStateLoaded"
      :server-items-length="animalRecordsAvailable.available"
      @update:page="handleNextPage"
    >
      <template #item.species="{ item }">
        <v-icon>
          {{ getSpeciesIcon(item.species) }}
        </v-icon>
      </template>
      <template #item.contact="{ item }">
        {{ item.contact.address.city }}, {{ item.contact.address.state }}
      </template>
      <template #item.url="{ item }">
        <a @click="handleCheckoutAnimal(item)">Check out {{ item.name }}</a>
      </template>
    </v-data-table>
  </div>
</template>

<script lang='ts'>
import { v4 as uuid } from 'uuid'
import useAnimals from '../data/animals'
import { IAnimal } from '../models/AnimalList'

export default {
  name: 'AnimalTable',
  setup () {
    const { animalRecordsAvailable, animalList, isAnimalStateLoaded, getAnimalsFromApi } = useAnimals()

    const headers = [
      {
        text: 'Name',
        value: 'name',
        width: '250px'
      },
      {
        text: 'Species',
        value: 'species',
        width: '100px'
      },
      {
        text: 'Breed',
        value: 'breeds.primary',
        width: '175px'
      },
      {
        text: 'Location',
        value: 'contact',
        width: '175px'
      },
      {
        text: 'Description',
        value: 'description',
        sortable: false,
        width: '400px'
      },
      {
        text: '',
        value: 'url',
        sortable: false
      }
    ]

    const getSpeciesIcon = (species: string) => {
      switch (species.toLowerCase()) {
        case 'dog':
          return 'mdi-dog'
        case 'cat':
          return 'mdi-cat'
        default:
          return species
      }
    }

    const handleAnimalRefresh = async () => {
      await getAnimalsFromApi()
    }

    const handleCheckoutAnimal = (item: IAnimal) => {
      window.open(item.url, '_blank')
    }

    const handleNextPage = async (event: number) => {
      const selectedPage = event
      await getAnimalsFromApi(selectedPage)
    }

    return {
      animalRecordsAvailable,
      animalList,
      getSpeciesIcon,
      handleAnimalRefresh,
      handleCheckoutAnimal,
      handleNextPage,
      headers,
      isAnimalStateLoaded,
      uuid
    }
  }
}
</script>
