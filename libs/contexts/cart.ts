import { atom } from "recoil"
import { CartItemInterface } from "@libs/interfaces/cartItem"

export const cartState = atom({
    key: 'cart',
    default: [] as CartItemInterface[]
})

export const removeFromCart = (cart:any, product:any) => {
  // console.log(cart)
  // console.log(product)
  // item in cart is using product's refId
  const foundIndex = cart.findIndex((x:any) => x.id === product.refId)
  // console.log(foundIndex)

  const newCart = [...cart]
  newCart.splice(foundIndex, 1) //remove from start index at foundIndex 1 object
  return newCart
  // if (foundIndex >= 0) {
  //   newCart[foundIndex] = {
  //     ...cart[foundIndex],
  //     quantity: 0,
  //   }
  //   return newCart
  // }
}

export const addToCart = (cart:any, product:any, qtyAdded:number) => {
  const newCart = [...cart]
  const foundIndex = cart.findIndex((x:any) => x.id === product.refId)

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + qtyAdded,
    };
    return newCart
  }

  // Add new item
  // cart is using refId as Id
  newCart.push({
    // product,
    id: product?.refId,
    name: product?.name,
    quantity: qtyAdded,
  });
  return newCart
}