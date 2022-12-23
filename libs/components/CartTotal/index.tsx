import { Box, Flex, Skeleton } from "@chakra-ui/react"
import { crossCheck } from "@components/Cart"
import { CartItemCheckoutInterface, CartItemInterface } from "@interfaces//cartItem"
import { cartState } from "@libs/contexts/cart"
import { productsState } from "@libs/contexts/products"
import { ItemInterface } from "@libs/interfaces/storeItem"
import { useEffect, useState } from "react"
import { constSelector, useRecoilValue } from "recoil"

const CartTotal = () => {
    const store = useRecoilValue<ItemInterface[]>(productsState)
    const cart = useRecoilValue<CartItemInterface[]>(cartState)
    const [ checkCart, setCheckCart ] = useState<CartItemCheckoutInterface[]|any>([])
    const [ isLoadingTotal, setIsLoadingTotal ] = useState<boolean>(true)
    const [ total, setTotal ] = useState<number>()

    useEffect(() => {
        if (Object.keys(cart).length !== 0) {
            const newCart = crossCheck(cart, store)
            setCheckCart(newCart)
        }
        console.log(checkCart)
        // const total = checkCart.reduce( (acc:number, index:number) =>
        //     acc + checkCart[index].quantity * checkCart[index].price
        // )
        // setTotal(total)
        // setIsLoading(false)
    }, [])
    // console.log(total)

    if (isLoadingTotal) return (
        <Box>
            <Skeleton height={4} mb={2} />
            <Skeleton height={6} />
        </Box>
    )

    return (
        <Flex flexDirection='column' textAlign='right' mt={4}>
            {/* TODO: add currency */}
            <Box fontSize={12}>Total (IDR)</Box>
            <Box fontWeight={600}>{total}</Box>
        </Flex>
    )
}

export default CartTotal