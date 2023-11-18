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

export interface PurchaseItemInterface {
    id: string
    refId?: string
    name: string
    description: string
    price: number // string because it's from input
    lastPurchasePrice?: number // string because it's from input
    currentStock?: number
    image: string
    isTrending?: boolean
    quantity: number // string because it's from input
    subtotal: number
}