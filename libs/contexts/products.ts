import { atom, useRecoilState } from "recoil"
import { ItemInterface } from "@libs/interfaces/storeItem"
import axios from "axios"

export const productsState = atom({
    key: 'products',
    default: [] as ItemInterface[]
})

export async function loadProducts() {
    const getProducts:any = await axios.get('/api/products')
        .then(response => response.data)
        .catch(e => console.log(e))
    return getProducts
}
  