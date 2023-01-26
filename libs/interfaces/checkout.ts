import { CartItemCheckoutInterface } from "./cartItem"

export interface UserInterface {
    id: string | null | undefined
    email: string | null | undefined
    name: string | null | undefined
}
export interface IFormInput {
    address: string
    city: string
    province: string
    postal: string
    total: number
    note: string
    orders: CartItemCheckoutInterface[]
    user: UserInterface
}