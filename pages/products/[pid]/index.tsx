import { Box, Button, Flex, Grid, GridItem, Text, useControllableState } from "@chakra-ui/react"
import BlockContainer, { BlockContainerLink, BlockImage } from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import { useRouter } from "next/router"

import { useRecoilState, useRecoilValue } from "recoil"
import { CartItemInterface, cartState, addToCart } from "@libs/contexts/recoil"

import { dummyItems, ItemInterface } from "@data//dummy_items"
import { useEffect, useState } from "react"

const ProductDetailView = () => {
    const router = useRouter()
    const { pid }:any = router.query
    const [ obj, setObj ] = useState<ItemInterface>({
        id: 0,
        name: '',
        price: 0
    })

    const [qid, setQid] = useState<number|any>()
    useEffect(() => {
        let qpid:any = parseInt(pid)
        setQid(qpid)
        const selected:ItemInterface|undefined = dummyItems.find( item => {
            return item.id === qpid
        })
        if (selected !== undefined) setObj(selected)
        console.log(selected)
    },[pid])

    const [value, setValue] = useState(1)
    const [internalValue, setInternalValue] = useControllableState({
        value,
        onChange: setValue,
    })

    const [ cart, setCart ] = useRecoilState<CartItemInterface[]>(cartState)

    const handleAddToCart = (product:ItemInterface) => {
        // console.log(obj.id)

        const newCart = addToCart(cart, product, value)
        setCart(newCart)

        // console.log(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    if (!qid) { return ( <MainLayout>Loading . . .</MainLayout> ) }

    return (
        <MainLayout>
            <Grid templateColumns='1fr 1fr' gap={8}>
                <GridItem>
                    <BlockImage />
                </GridItem>
                <GridItem>
                    <Text fontSize={24} fontWeight={600}>
                        {/* {title} */}
                        {obj.name}
                    </Text>
                    <Text mb={4}>
                        {/* IDR 800000 */}
                        IDR {obj.price}
                    </Text>
                    <Text fontSize={14} mb={4} color='blackAlpha.800'>
                        {/* {description} */}
                        It's right there
                    </Text>

                    <Flex mb={2}>
                        <FormSubmitButton notLink px={2}
                            onClick={() => setInternalValue(value + 1)}>
                            +
                        </FormSubmitButton>
                        <Box
                            bgColor='whiteAlpha.700'
                            borderTop='1px solid black'
                            borderBottom='1px solid black'
                            py={2} px={4} h={10}
                        >
                            {internalValue}
                        </Box>
                        <FormSubmitButton notLink px={2}
                            onClick={() => setInternalValue(value - 1)}>
                            -
                        </FormSubmitButton>
                    </Flex>

                    <FormSubmitButton notLink
                        onClick={ () => handleAddToCart(obj) } >
                        Add to Cart
                    </FormSubmitButton>
                </GridItem>
            </Grid>

            <CartItems />
        </MainLayout>
    )
}

export const CartItems = () => {
    const cart = useRecoilValue(cartState)

    if (Object.keys(cart).length === 0) {
        return <Box>No Items</Box>
    }
    return (
        <Box>
            <ul className="cart-items">
                {cart.map((item:CartItemInterface) => {
                    console.log(item)
                    return (
                        <li key={item.id}>{item.name}: {item.quantity}</li>
                    )
                })}
            </ul>
        </Box>
    )
}

export default ProductDetailView