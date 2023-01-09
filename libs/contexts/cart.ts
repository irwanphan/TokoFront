import { atom, selector } from "recoil"
import { CartItemInterface } from "@libs/interfaces/cartItem"
import { ItemInterface } from "@interfaces//storeItem";
import { productsState } from "./products";

export const cartState = atom({
  key: 'cart',
  default: [] as CartItemInterface[]
})

export const checkCartState = selector({
  key: 'checkCart',
  // default: [] as CartItemCheckoutInterface[] | any,
  get: ({get}) => {
    const cart = get(cartState)
    const store = get(productsState)
    const checkCart = crossCheck(cart, store)
    return checkCart
  }
})

export const removeFromCart = (cart:any, product:any) => {
  // item in cart is using product's refId
  const foundIndex = cart.findIndex((x:any) => x.id === product.refId)

  const newCart = [...cart]
  newCart.splice(foundIndex, 1) //remove from start index at foundIndex 1 object

  return newCart

  // to remove all
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

export const crossCheck = (cart:CartItemInterface[], store:ItemInterface[]) => {
  const newCart = [...cart]
  newCart.map((cartItem:CartItemInterface, index:number) => {
      const selectedItem = store.find( (item:ItemInterface) => {
          // cart is using product's refId
          return item.refId === cartItem.id
      })
      // console.log(selectedItem)
      if (selectedItem) {
          const newCartItem = {
              ...newCart[index],
              price: selectedItem.price,
              subtotal: cartItem.quantity * selectedItem.price
          }
          // console.log('current cart item: ',newCartItem)
          newCart[index] = newCartItem
      }
  })
  // console.log('new cart: ',newCart)
  return newCart
}