import { checkCartState } from "@contexts/cart"
import { CartItemCheckoutInterface } from "@interfaces//cartItem"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

export const useCheckCart = () => {
    const [ isLoadingCheckCart, setIsLoadingCheckCart ] = useState<boolean>(true)
    const checkCart = useRecoilValue<CartItemCheckoutInterface[]|any>(checkCartState)

    useEffect(() => {
        setIsLoadingCheckCart(false)
    }, [checkCart])

    return {
        checkCart,
        isLoadingCheckCart
    }
}