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

    const [value, setValue] = useState(40)

    const [internalValue, setInternalValue] = useControllableState({
        value,
        onChange: setValue,
    })

    const [ cart, setCart ] = useRecoilState<CartItemInterface[]>(cartState)

    const handleAddToCart = (product:ItemInterface) => {
        // console.log(obj.id)

        const newCart = addToCart(cart, product, value)
        setCart(newCart)

        console.log(cart)
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
                    <Text mb={3}>
                        {/* IDR 800000 */}
                        IDR {obj.price}
                    </Text>
                    <Text fontSize={12} mt={1} color='blackAlpha.800'>
                        {/* {description} */}
                        It's right there
                    </Text>

                    <Flex>
                        <Button onClick={() => setInternalValue(value + 1)}>+</Button>
                        <Box as='span' w='200px' mx='24px'>
                            {internalValue}
                        </Box>
                        <Button onClick={() => setInternalValue(value - 1)}>-</Button>
                    </Flex>

                    <FormSubmitButton
                        buttonColor='white'
                        notLink
                        onClick={() => {
                            handleAddToCart(obj)
                        }}
                        >
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
                {cart.map((item:CartItemInterface) => (
                    <li key={item.id}>{item.name}: {item.qty}</li>
                ))}
            </ul>
        </Box>
    )
}

export default ProductDetailView