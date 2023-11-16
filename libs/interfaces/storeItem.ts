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
    price: string // string because it's from input
    lastPurchasePrice?: string // string because it's from input
    currentStock?: number
    image: string
    isTrending?: boolean
    quantity: string // string because it's from input
    subtotal: string
}