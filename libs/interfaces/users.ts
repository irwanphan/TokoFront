export interface UserInterface {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string
}

export interface UserAddresses {
    id: string
    name: string
    address: string
    city: string
    province: string
    postal: string
    note?: string
    userId: string
}