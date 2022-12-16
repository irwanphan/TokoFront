import { Box, Button, Flex, Grid, GridItem, ListItem, OrderedList, Text, useControllableState } from "@chakra-ui/react"
import BlockContainer, { BlockContainerLink, BlockImage } from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import { useRouter } from "next/router"

import { useRecoilState } from "recoil"
import { CartItemInterface, cartState, addToCart } from "@libs/contexts/cart"

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

    useEffect(() => {
        const cartData = localStorage.getItem("cart")
        console.log('storage: ', cartData)
        const parsedData = JSON.parse(cartData!)
        if (parsedData) {
            setCart(parsedData);
        }
    }, [])

    const handleAddToCart = (product:ItemInterface) => {
        const newCart = addToCart(cart, product, value)
        localStorage.setItem("cart", JSON.stringify(newCart))
        setCart(newCart)
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
                            onClick={() => setInternalValue(value - 1)}>
                            -
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
                            onClick={() => setInternalValue(value + 1)}>
                            +
                        </FormSubmitButton>
                    </Flex>

                    <FormSubmitButton notLink
                        onClick={ () => handleAddToCart(obj) } >
                        Add to Cart
                    </FormSubmitButton>
                </GridItem>
            </Grid>
        </MainLayout>
    )
}

export default ProductDetailView