import { atom, selector } from "recoil"
import { CartItemCheckoutInterface, CartItemInterface } from "@libs/interfaces/cartItem"
import { ItemInterface } from "@interfaces//storeItem";
import { productsState } from "./products";

export const purchaseCartState = atom({
  key: 'purchaseCart',
  default: [] as CartItemCheckoutInterface[]
})

export const checkPurchaseCartState = selector({
  key: 'checkPurchaseCart',
  // default: [] as CartItemCheckoutInterface[] | any,
  get: ({get}) => {
    const purchaseCart = get(purchaseCartState)
    const store = get(productsState)
    const checkPurchaseCart = crossCheck(purchaseCart, store)
    return checkPurchaseCart
  }
})

export const removeFromPurchaseCart = (purchaseCart:any, product:any) => {
  // item in purchaseCart is using product's refId
  const foundIndex = purchaseCart.findIndex((x:any) => x.id === product.refId)

  const newCart = [...purchaseCart]
  newCart.splice(foundIndex, 1) //remove from start index at foundIndex 1 object

  return newCart

  // to remove all
  // if (foundIndex >= 0) {
  //   newCart[foundIndex] = {
  //     ...purchaseCart[foundIndex],
  //     quantity: 0,
  //   }
  //   return newCart
  // }
}

export const addToPurchaseCart = (product:any) => {
  // const newCart = [...purchaseCart]
  // const foundIndex = purchaseCart.findIndex((x:any) => x.id === product.refId)

  // console.log('foundIndex: ',foundIndex)
  console.log('product: ',product)

  // // Increase quantity if existing
  // if (foundIndex >= 0) {
  //   newCart[foundIndex] = {
  //     ...purchaseCart[foundIndex],
  //     quantity: purchaseCart[foundIndex].quantity + qtyAdded,
  //   };
  //   return newCart
  // }

  // // Add new item
  // // purchaseCart is using refId as Id
  // newCart.push({
  //   // product,
  //   id: product?.refId,
  //   name: product?.name,
  //   quantity: qtyAdded,
  // });
  // return newCart
}

export const crossCheck = (purchaseCart:CartItemInterface[], store:ItemInterface[]) => {
  const newCart = [...purchaseCart]
  newCart.map((cartItem:CartItemInterface, index:number) => {
      const selectedItem = store.find( (item:ItemInterface) => {
          // purchaseCart is using product's refId
          return item.refId === cartItem.id
      })
      // console.log(selectedItem)
      if (selectedItem) {
          const newCartItem = {
              ...newCart[index],
              price: selectedItem.price,
              subtotal: cartItem.quantity * selectedItem.price
          }
          // console.log('current purchaseCart item: ',newCartItem)
          newCart[index] = newCartItem
      }
  })
  // console.log('new purchaseCart: ',newCart)
  return newCart
}