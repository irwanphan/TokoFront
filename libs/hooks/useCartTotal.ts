import { checkCartState } from "@contexts/cart"
import { CartItemCheckoutInterface } from "@interfaces//cartItem"
import { useState, useEffect } from "react"
import { useRecoilValue } from "recoil"

const useCartTotal = () => {
    const [ total, setTotal ] = useState<number|any>(0)
    const [ isLoadingTotal, setIsLoadingTotal ] = useState<boolean>(true)
    const checkCart = useRecoilValue<CartItemCheckoutInterface[]|any>(checkCartState)
    useEffect(() => {
        const total = checkCart?.reduce( (acc:number, {subtotal}:any) =>
            acc + subtotal, 0
        )
        if (total > 0) setTotal(total) // does not set when it is undefined or null or 0
    }, [checkCart])
    useEffect(() => {
        if ( typeof(total) == 'number' ) setIsLoadingTotal(false)
    }, [total])
  
    return {
        total,
        isLoadingTotal
    }
}

export default useCartTotal