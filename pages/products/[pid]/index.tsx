import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Box, Flex, Grid, GridItem, Skeleton, Text, useControllableState, useToast } from "@chakra-ui/react"
import BlockContainer, { BlockImage } from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"

import { ItemInterface } from "@libs/interfaces/storeItem"
import { cartState, addToCart } from "@libs/contexts/cart"
import { CartItemInterface } from "@libs/interfaces/cartItem"
import { useRecoilState } from "recoil"
import { loadProducts, productsState } from "@libs/contexts/products"
import LoadingBlock from "@elements/LoadingBlock"

const ProductDetailView = () => {
    const [ isLoadingProduct, setIsLoadingProduct ] = useState<boolean>(true)
    
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
    const [ store, setStore ] = useRecoilState<ItemInterface[]>(productsState)
    const [ stock, setStock ] = useState<number>()
    const [ inCart, setInCart ] = useState<number>()
    const [ qid, setQid ] = useState<number|any>()
    
    useEffect(() => {
        // TODO: API for get single product
        const products = loadProducts()
        .then(res => setStore(res))
        // .then(() => setIsLoadingProducts(false))
        .catch(e => {
            toast({
                title: 'Error',
                description: `You're not connected to our server!`,
                render: () => (
                    <BlockContainer py={4} px={6} bgColor="green.100">You're not connected to our server!</BlockContainer>
                )
            })
            // console.error(e.response.status)
        })
        setQid(pid)
    }, [pid])
    useEffect(() => {
        const selected:ItemInterface|undefined = store.find( item => item.id === pid )
        setStock(selected?.currentStock)
        if (selected !== undefined) setObj(selected)
        const taken:CartItemInterface|undefined = cart.find( item => item.id === pid )
        setInCart(taken?.quantity)
        // console.log(selected)
    },[store])
    useEffect(() => { setIsLoadingProduct(false) },[inCart])
    // console.log(inCart)
    // console.log(stock)

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
        if (inCart) {
            if (inCart + value > stock!) {
                notify(`${obj.name}'s stock is not enough`)
                return
            }
        }
        const newCart = addToCart(cart, product, value)
        localStorage.setItem("cart", JSON.stringify(newCart))
        setCart(newCart)
        notify(`${value} of ${obj.name} added`)
    }

    // if item not show yet
    // if (!qid) { return ( <MainLayout>Loading . . .</MainLayout> ) }

    if (isLoadingProduct) return (
        <MainLayout>
            <Grid templateColumns={{base: '1fr', md: '1fr 1fr'}} gap={4}>
                <LoadingBlock />
                <Box>
                    <Skeleton h={12} mb={4} />
                    <Skeleton h={6} mb={2} />
                    <Skeleton h={4} mb={6} />
                    <Skeleton h={8} w={40} />
                </Box>
            </Grid>
        </MainLayout>
    )

    return (
        <MainLayout>
            <Grid templateColumns={{base: '1fr', md: '1fr 1fr'}} gap={4}>
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