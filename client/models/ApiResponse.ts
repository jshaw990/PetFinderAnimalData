import { IAnimal } from './AnimalList'
import { IData, IPagination } from './Data'

export interface IAnimalRequest {
    animals: Array<IAnimal>
    data: IData
    pagination: IPagination
}

export interface IGetRequest {
    payload: IAnimalRequest
    success: Boolean
}
