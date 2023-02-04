import { reactive, toRefs } from 'vue'
import { apiGetAsync } from '../utils/apiRequest'
import { IAnimal } from '../models/AnimalList'
import { IGetRequest } from '../models/ApiResponse'
import { getFromLocalStorage, writeToLocalStorage } from './utils'

const animalState = reactive({
    isAnimalStateLoaded: false,
    animalList: [] as Array<IAnimal>,
    animalMetaData: {} as any,
    animalAggregateData: {} as any,
    animalStateLoadedAt: -1,
    animalRecordsAvailable: {} as any,
    currentPage: 1
})

export default function useAnimals() {
    const oneHourInMilliseconds = 3600000

    const countAnimalRecordsAvailable = () => {
        const availableRecords = {
            loaded: animalState.animalList.length,
            available: animalState.animalMetaData.total_count
        }

        animalState.animalRecordsAvailable = availableRecords
    }

    const clearAnimalState = () => {
        animalState.isAnimalStateLoaded = false
        animalState.animalList = [] as Array<IAnimal>
        animalState.animalMetaData = {} as any
        animalState.animalAggregateData = {} as any
        animalState.animalStateLoadedAt = -1
        animalState.currentPage = 1
    }

    const getAnimalsFromApiBulk = async (take: number = 5) => {
        clearAnimalState()

        const request: IGetRequest | null = await apiGetAsync(`get_animals_multipage?take=${take}`)

        if (request !== null && request.status === 'success') {
            animalState.animalList = request.animals.animals
            animalState.animalMetaData = request.animals.pagination
            animalState.animalAggregateData = request.animals.data
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

    const getAnimalsFromApi = async (page: number = 1) => {
        clearAnimalState()

        const request = await apiGetAsync(`get_animals?page=${page}`)

        if (request !== null && request.status === 'success') {
            animalState.animalList = request.animals.animals
            animalState.animalMetaData = request.animals.pagination
            animalState.animalAggregateData = request.animals.data
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

    const writeAnimalsToLocalStorage = (key: string, payload: object) => {
        animalState.isAnimalStateLoaded = false
        const animalObject = {
            updatedAt: Date.now(),
            payload
        }

        writeToLocalStorage(key, animalObject)
        animalState.isAnimalStateLoaded = true
    }

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
