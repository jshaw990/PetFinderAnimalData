/**
 * Stringifies data and sets it in local storage with the provided key
 * @param key local storage key
 * @param data data in JSON
 */
export const writeToLocalStorage = (key: string, data: Object) => {
    localStorage.setItem(key, JSON.stringify(data))
}

/**
 * Retrieve data from local storage and return it as JSON
 * @param key key to look for in local storage
 * @returns data from local storage in JSON
 */
export const getFromLocalStorage = (key: string) => {
    const fromLocal = localStorage.getItem(key)

    if (fromLocal == null || fromLocal === undefined) {
        return null
    }

    return JSON.parse(fromLocal)
}
