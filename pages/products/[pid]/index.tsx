import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Box, Flex, Grid, GridItem, Text, useControllableState, useToast } from "@chakra-ui/react"
import BlockContainer, { BlockImage } from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"

import { dummyItems, ItemInterface } from "@libs/interfaces/storeItem"
import { cartState, addToCart } from "@libs/contexts/cart"
import { CartItemInterface } from "@libs/interfaces/cartItem"
import { useRecoilState } from "recoil"

const ProductDetailView = () => {
    const router = useRouter()
    const { pid }:any = router.query
    const [ obj, setObj ] = useState<ItemInterface>({
        id: '',
        name: '',
        description: '',
        price: 0,
        image: ''
    })

    // handling ShowItem
    const [qid, setQid] = useState<number|any>()
    useEffect(() => {
        setQid(pid)
        const selected:ItemInterface|undefined = dummyItems.find( item => item.id === pid )
        if (selected !== undefined) setObj(selected)
        // console.log(selected)
    },[pid])

    // handling QtyPicker
    const [value, setValue] = useState(1)
    const [internalValue, setInternalValue] = useControllableState({
        value,
        onChange: setValue,
    })
    
    // handling notification
    const toast = useToast()
    const notify = (message:string) => {
        toast({
            duration: 1500,
            position: 'bottom-right',
            render: () => (
                <BlockContainer py={4} px={6}>{message}</BlockContainer>
            )
        })
    }

    // handling AddToCart
    const [ cart, setCart ] = useRecoilState<CartItemInterface[]>(cartState)
    useEffect(() => {
        const cartData = localStorage.getItem("cart")
        // console.log('storage: ', cartData)
        const parsedData = JSON.parse(cartData!)
        if (parsedData) {
            setCart(parsedData);
        }
    }, [])
    const handleAddToCart = (product:ItemInterface) => {
        const newCart = addToCart(cart, product, value)
        localStorage.setItem("cart", JSON.stringify(newCart))
        setCart(newCart)
        notify(`${value} of ${obj.name} added`)
    }

    // if item not show yet
    if (!qid) { return ( <MainLayout>Loading . . .</MainLayout> ) }

    return (
        <MainLayout>
            <Grid templateColumns={{base: '1fr', md: '1fr 1fr'}} gap={8}>
                <GridItem>
                    <BlockImage imgUrl={obj.image} />
                </GridItem>
                <GridItem>
                    <Text fontSize={24} fontWeight={600}>
                        {obj.name}
                    </Text>
                    <Text mb={4}>
                        IDR {obj.price}
                    </Text>
                    <Text fontSize={14} mb={4} color='blackAlpha.800'>
                        {obj.description}
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