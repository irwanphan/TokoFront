export interface ItemInterface {
    id: string
    refId?: string
    name: string
    description: string
    price: number
    quantity?: number
    currentStock?: number
    image: string
    isTrending?: boolean
}