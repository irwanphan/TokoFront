export interface CartItemInterface {
    id: string
    name: string
    quantity: number
}

export interface CartItemCheckoutInterface {
    id: string
    name: string
    quantity: number
    price: number
    subtotal: number
}