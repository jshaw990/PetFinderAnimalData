import { reactive, toRefs } from 'vue'
import { apiGetAsync } from '../utils/apiRequest'
import { IAnimal } from '../models/AnimalList'
import { IGetRequest } from '../models/ApiResponse'
import { getFromLocalStorage, writeToLocalStorage } from './utils'
import { IAvailableRecords, IData, IPagination } from '~/models/Data'

const animalState = reactive({
    isAnimalStateLoaded: false,
    animalList: [] as Array<IAnimal>,
    animalMetaData: {} as IPagination,
    animalAggregateData: {} as IData,
    animalStateLoadedAt: -1,
    animalRecordsAvailable: {} as IAvailableRecords,
    currentPage: 1
})

export default function useAnimals() {
    const oneHourInMilliseconds = 3600000

    /**
      * Count the number of loaded and available animal records from PetFinder
      */
    const countAnimalRecordsAvailable = () => {
        const availableRecords = {
            loaded: animalState.animalList.length,
            available: animalState.animalMetaData.total_count
        } as IAvailableRecords

        animalState.animalRecordsAvailable = availableRecords
    }

    /**
       * Return the animal state to default
       */
    const clearAnimalState = () => {
        animalState.isAnimalStateLoaded = false
        animalState.animalList = [] as Array<IAnimal>
        animalState.animalMetaData = {} as IPagination
        animalState.animalAggregateData = {} as IData
        animalState.animalStateLoadedAt = -1
        animalState.animalRecordsAvailable = {} as IAvailableRecords
        animalState.currentPage = 1
    }

    /**
       * Get a bulk number of animals from the API
       * @param take how many pages of data to collect
       */
    const getAnimalsFromApiBulk = async (take: number = 5) => {
        clearAnimalState()

        const request: IGetRequest | null = await apiGetAsync(`get_animals_multipage?take=${take}`)

        if (request !== null && request.success) {
            animalState.animalList = request.payload.animals
            animalState.animalMetaData = request.payload.pagination
            animalState.animalAggregateData = request.payload.data
            animalState.isAnimalStateLoaded = true
            animalState.animalStateLoadedAt = Date.now()
            countAnimalRecordsAvailable()

            if (take < 100) {
                writeAnimalsToLocalStorage('animals', animalState.animalList)
                writeAnimalsToLocalStorage('animalMetaData', animalState.animalMetaData)
                writeAnimalsToLocalStorage('animalAggregateData', animalState.animalAggregateData)
            }
        }
        return request
    }

    /**
       * Get a page of animals from the api
       * @param page page number to query for
       */
    const getAnimalsFromApi = async (page: number = animalState.currentPage) => {
        clearAnimalState()

        const request = await apiGetAsync(`get_animals?page=${page}`)

        if (request !== null && request.success) {
            animalState.animalList = request.payload.animals
            animalState.animalMetaData = request.payload.pagination
            animalState.animalAggregateData = request.payload.data
            animalState.isAnimalStateLoaded = true
            animalState.animalStateLoadedAt = Date.now()
            animalState.currentPage = page
            countAnimalRecordsAvailable()

            writeAnimalsToLocalStorage('animals', animalState.animalList)
            writeAnimalsToLocalStorage('animalMetaData', animalState.animalMetaData)
            writeAnimalsToLocalStorage('animalAggregateData', animalState.animalAggregateData)
        }
        return request
    }

    /**
       * Get animal state from local storage.
       * If it does not exist or is older than one hour, query the API for more current data.
       */
    const getAnimalsFromLocalStorage = async () => {
        clearAnimalState()

        const animalsInLocalStorage = getFromLocalStorage('animals')
        const animalMetaDataInLocalStorage = getFromLocalStorage('animalMetaData')
        const animalAggregateDataInLocalStorage = getFromLocalStorage('animalAggregateData')

        if (
            animalMetaDataInLocalStorage === null ||
            animalsInLocalStorage === null ||
            animalAggregateDataInLocalStorage === null
        ) {
            await getAnimalsFromApi()
            return
        }

        const timeSinceLastLoad = Date.now() - animalsInLocalStorage.updatedAt

        if (timeSinceLastLoad < oneHourInMilliseconds) {
            animalState.animalList = animalsInLocalStorage.payload
            animalState.animalMetaData = animalMetaDataInLocalStorage.payload
            animalState.animalAggregateData = animalAggregateDataInLocalStorage.payload
            animalState.isAnimalStateLoaded = true
            animalState.animalStateLoadedAt = Date.now()

            countAnimalRecordsAvailable()
        } else {
            await getAnimalsFromApi()
        }
    }

    /**
       * Write data to local storage
       * @param key local storage key
       * @param payload data to store
       */
    const writeAnimalsToLocalStorage = (key: string, payload: object) => {
        animalState.isAnimalStateLoaded = false
        const animalObject = {
            updatedAt: Date.now(),
            payload
        }

        writeToLocalStorage(key, animalObject)
        animalState.isAnimalStateLoaded = true
    }

    /**
       * Load animal data to state
       * @param refresh force load data from API
       */
    const loadAllAnimals = (refresh: boolean = false) => {
        let requireRefresh = refresh

        if (!requireRefresh && animalState.animalStateLoadedAt !== -1) {
            const timeSinceLastLoad = Date.now() - animalState.animalStateLoadedAt
            // if timeSinceLastLoad is more than one hour, refresh the task list
            requireRefresh = timeSinceLastLoad > oneHourInMilliseconds
        }

        if (
            !animalState.isAnimalStateLoaded ||
            animalState.animalList.length === 0 ||
            requireRefresh
        ) {
            getAnimalsFromLocalStorage()
        }
    }

    return {
        countAnimalRecordsAvailable,
        getAnimalsFromApi,
        getAnimalsFromApiBulk,
        loadAllAnimals,
        ...toRefs(animalState)
    }
}
