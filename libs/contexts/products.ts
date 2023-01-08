import { atom } from "recoil"
import { ItemInterface } from "@libs/interfaces/storeItem"

export const productsState = atom({
    key: 'products',
    default: [] as ItemInterface[]
})