export const writeToLocalStorage = (type: string, data: Object) => {
    localStorage.setItem(type, JSON.stringify(data))
}

export const getFromLocalStorage = (item: string) => {
    const fromLocal = localStorage.getItem(item)

    if (fromLocal == null || fromLocal === undefined) {
        return null
    }

    return JSON.parse(fromLocal)
}
