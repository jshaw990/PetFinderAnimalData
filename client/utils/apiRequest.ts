import { IGetRequest } from '../models/ApiResponse'

const PATH = 'http://127.0.0.1:5000'

export async function apiGetAsync(route: string): Promise<IGetRequest | null> {
    let returnValue = null

    await fetch(`${PATH}/${route}`)
        .then(response => response.json())
        .then((data) => {
            returnValue = data as IGetRequest
            returnValue.success = data.success === 'true'
        })
    return returnValue
}
