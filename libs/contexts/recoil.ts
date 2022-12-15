import { atom, selector } from "recoil";

export interface CartItemInterface {
    id: string
    name: string
    quantity: number
}

export const cartState = atom({
    key: 'cart',
    default: [] as CartItemInterface[]
})


export const addToCart = (cart:any, product:any, qtyAdded:number) => {
  const newCart = [...cart]
  const foundIndex = cart.findIndex((x:any) => x.id === product.id)

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + qtyAdded,
    };
    return newCart;
  }

  // Add new item
  newCart.push({
    // product,
    id: product.id,
    name: product.name,
    quantity: qtyAdded,
  });
  return newCart;
}