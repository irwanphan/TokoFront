import { Box, Flex } from "@chakra-ui/react"
import { cartState } from "@libs/contexts/cart"
import { productsState } from "@libs/contexts/products"
import { ItemInterface } from "@libs/interfaces/storeItem"
import { useRecoilValue } from "recoil"


const CartTotal = () => {

    
    const totaling = () => {
        const store = useRecoilValue(productsState)
        const cart = useRecoilValue(cartState)
        const inCart:any = cart.map( cartItem => store.find(x => x.id === cartItem.id) )
        const total = cart.reduce( (acc, {id, quantity}) =>
            acc + quantity * inCart.find((x:ItemInterface) => x.id === id).price, 0)
        // console.log(total)
        return total
    }

    const total = totaling()

    return (
        <Flex flexDirection='column' textAlign='right' mt={4}>
            {/* TODO: add currency */}
            <Box fontSize={12}>Total (IDR)</Box>
            <Box fontWeight={600}>{total}</Box>
        </Flex>
    )
}

export default CartTotal