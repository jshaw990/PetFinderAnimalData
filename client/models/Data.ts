export interface IKeyValuePair {
    [key: string]: number | undefined
}

export interface IData {
    age: IKeyValuePair
    breeds: IKeyValuePair
    c_primary: IKeyValuePair
    coat: IKeyValuePair
    declawed: IKeyValuePair
    e_cats: IKeyValuePair
    e_children: IKeyValuePair
    e_dogs: IKeyValuePair
    gender: IKeyValuePair
    house_trained: IKeyValuePair
    shots_current: IKeyValuePair
    size: IKeyValuePair
    spayed_neutered: IKeyValuePair
    special_needs: IKeyValuePair
    species: IKeyValuePair
    state: IKeyValuePair
    status: IKeyValuePair
    tags: IKeyValuePair
}

export interface INext {
    href: string
}

export interface ILinks {
    next: INext
}

export interface IPagination {
    _links: ILinks
    count_per_page: number
    current_page: number
    total_count: number
    total_pages: number
}

export interface IAvailableRecords {
    available: number
    loaded: number
}