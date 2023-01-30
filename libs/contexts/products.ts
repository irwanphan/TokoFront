import { atom, selector } from "recoil"
import { ItemInterface } from "@libs/interfaces/storeItem"

export const productsState = atom({
    key: 'products',
    default: [] as ItemInterface[]
})

export const productsTrendingState = selector({
    key: 'productsTrending',
    get: ({get}) => {
      const store = get(productsState)
      const checkTrend = (products:ItemInterface[]) => {
        return products.filter(product => product.isTrending === true)
      }
      const storeTrending = checkTrend(store)
      return storeTrending
    }
  })