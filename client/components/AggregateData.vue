<template>
  <div>
    <template v-if="isAnimalStateLoaded">
      <div class="text-center">
        <div>
          Select a category to view aggregate data on available animals for
        </div>
        <v-select
          v-model="selectedValue"
          :items="dataMessage"
          item-text="message"
          item-value="key"
          style="width: 300px;"
          class="mx-auto"
          @change="dataToDisplay"
        />
      </div>
      <div v-if="selectedData !== null" class="d-flex flex-row flex-wrap">
        <v-col v-for="(data, idx) in selectedData" :key="idx" cols="12" md="6" class="mx-auto">
          <div class="text-subtitle-1 pl-4 pb-2">
            {{ getDataMessage(selectedValue) }}
          </div>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    Value
                  </th>
                  <th class="text-center">
                    Count
                  </th>
                  <th class="text-center">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td class="text-left text-capitalize">
                    {{ i }}
                  </td>
                  <td class="text-center">
                    {{ item }}
                  </td>
                  <td class="text-center">
                    {{ getPercentage(item, data) }}%
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center py-4">
            <div>
              Records loaded: {{ animalRecordsAvailable.loaded }}
              Records available: {{ animalRecordsAvailable.available }}
            </div>
            <v-text-field
              v-model="loadRecordCount"
              hint="Enter the number of records you would like to load"
              :persistent-hint="true"
              style="width: 300px;"
              class="mx-auto text-center"
              @change="getPossibleAnimalPayloadSize"
            />
          </div>
        </v-col>
      </div>
    </template>
    <template v-else>
      <div class="d-flex flex-column align-center justify-center my-8">
        <div class="pb-4">
          Loading... Please wait.
        </div>
        <div v-if="loadRecordCount !== null && loadRecordCount >= 1000" class="pb-8">This may take a little bit...</div>
        <v-progress-circular indeterminate />
      </div>
    </template>
  </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onMounted } from 'vue'
import useAnimals from '../data/animals'
import { dataMessage } from '../data/aggregationData'
import { IKeyValuePair } from '../models/Data'

export default {
  name: 'AggregateData',
  setup () {
    const {
      animalAggregateData,
      animalRecordsAvailable,
      getAnimalsFromApiBulk,
      isAnimalStateLoaded,
      loadAllAnimals
    } = useAnimals()

    const state = reactive({
      selectedValue: null as string | null,
      selectedData: null as Array<IKeyValuePair> | null,
      loadRecordCount: null as number | null
    })

    const dataToDisplay = () => {
      if (state.selectedValue === null) {
        return animalAggregateData
      }

      const data = [] as Array<IKeyValuePair>

      const item: IKeyValuePair = animalAggregateData.value[state.selectedValue]

      if (item !== null) { data.push(item) }

      state.selectedData = data
    }

    const getPercentage = (value: number, data: Object) => {
      const totalValue = Object.values(data).reduce((partialSum, a) => partialSum + a, 0) / 100
      const calculatedValue = value / totalValue
      return Math.round(calculatedValue * 100) / 100
    }

    const getDataMessage = (type: string) => {
      const idx = dataMessage.findIndex(x => x.key === type)
      if (idx === -1) { return type }
      return dataMessage[idx].message
    }

    const getPossibleAnimalPayloadSize = async () => {
      if (
        state.loadRecordCount === null ||
        state.loadRecordCount === 0 ||
        state.loadRecordCount === animalRecordsAvailable.value.loaded ||
        state.loadRecordCount > animalRecordsAvailable.value.available
      ) { return }

      const requestedLoadAmount = Math.round(state.loadRecordCount / 20)

      await getAnimalsFromApiBulk(requestedLoadAmount)
    }

    onMounted(() => {
      loadAllAnimals()

      state.loadRecordCount = animalRecordsAvailable.value.loaded
    })

    return {
      animalAggregateData,
      animalRecordsAvailable,
      dataMessage,
      dataToDisplay,
      getDataMessage,
      getPercentage,
      getPossibleAnimalPayloadSize,
      isAnimalStateLoaded,
      ...toRefs(state)
    }
  }
}
</script>
