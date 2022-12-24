import { atom } from "recoil"
import { ItemInterface } from "@libs/interfaces/storeItem"
import axios from "axios"

export const productsState = atom({
    key: 'products',
    default: [] as ItemInterface[]
})

export async function loadProducts() {
    try {
        const getProducts:any = await axios.get('/api/products')
            .then(response => response.data)
        return getProducts
    }
    catch (error) {
        throw error
        // return error
    }
}
  