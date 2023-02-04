export interface IAnimalBreed {
    primary: string
    secondary: string
    mixed: boolean
    unknown: boolean
}

export interface IAnimalColor {
    primary: string
    secondary: string
    tertiary: string
}

export interface IAnimalPhoto {
    small: string
    medium: string
    large: string
    full: string
}

export interface IAnimalVideo {
    embed: string
}

export interface IAnimalAttributes {
    spayed_neutered: boolean
    house_trained: boolean
    declawed: boolean
    special_needs: boolean
    shots_current: boolean
}

export interface IAnimalEnvironment {
    children: boolean
    dogs: boolean
    cats: boolean
}

export interface IAnimalAddress {
    address1: string
    address2: string
    city: string
    state: string
    postcode: string
    country: string
}

export interface IAnimalContact {
    email: string
    phone: string
    address: IAnimalAddress
}

export interface IAnimalOrganization {
    href: string
}

export interface IAnimalLinks {
    self: IAnimalOrganization
    type: IAnimalOrganization
    organization: IAnimalOrganization
}

export interface IAnimal {
    id: number
    organization_id: string
    url: string
    type: string
    species: string
    breeds: IAnimalBreed
    colors: IAnimalColor
    age: string
    gender: string
    size: string
    coat: string
    name: string
    description: string
    photos: IAnimalPhoto
    videos: IAnimalVideo
    status: string
    attributes: IAnimalAttributes
    environement: IAnimalEnvironment
    tages: Array<string>
    contact: IAnimalContact
    published_at: string
    distance: number
    _links: IAnimalLinks
}
