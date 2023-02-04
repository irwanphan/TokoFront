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

export const checkoutResolver = (values:IFormInput) => {
    return {
        values: values.address ? values : 
                values.city ? values :
                values.province ? values :
                values.postal ? values :
                {},
        errors: !values.address ?
                { address: {
                    type: 'required',
                    message: 'Address is required.'
                }}
                : !values.city ?
                { city: {
                        type: 'required',
                        message: 'City is required.'
                }}
                : !values.province ?
                { province: {
                        type: 'required',
                        message: 'Province is required.'
                }}
                : !values.postal ?
                { postal: {
                        type: 'required',
                        message: 'Postal code is required.'
                }}
                : {}
    }
}