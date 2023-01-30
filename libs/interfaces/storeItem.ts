export interface ItemInterface {
    id: string
    refId?: string
    name: string
    description: string
    price: number
    currentStock?: number
    image: string
    isTrending?: boolean
}