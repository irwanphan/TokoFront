import { Box, Flex, Skeleton } from "@chakra-ui/react"
import { CartItemCheckoutInterface } from "@interfaces//cartItem"
import { checkCartState } from "@libs/contexts/cart"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

const CartTotal = () => {
    const checkCart = useRecoilValue<CartItemCheckoutInterface[]|any>(checkCartState)
    const [ isLoadingTotal, setIsLoadingTotal ] = useState<boolean>(true)
    const [ total, setTotal ] = useState<number>(0)

    useEffect(() => {
        if(checkCart.length > 0) {
            const total = checkCart?.reduce( (acc:number, {subtotal}:any) =>
            acc + subtotal, 0
            )
            // console.log('total: ', total)
            setTotal(total)
        }
    }, [checkCart])
    useEffect(() => {
        if (total) setIsLoadingTotal(false)
    },[total])
    // console.log('check cart (total): ', checkCart)

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