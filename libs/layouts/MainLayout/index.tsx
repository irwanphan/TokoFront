import { Box, FlexProps, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import LoadingOverlay from "@elements/LoadingOverlay"
import CustomHeader from "../CustomHeader"
import AnchorMenuNav from "../AnchorMenuNav"
import TokoFooter from "@libs/components/TokoFooter"

import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { cartState } from "@contexts/cart"
import { productsState, useFetchProducts } from "@contexts/products"
import { CartItemInterface } from "@interfaces//cartItem"
import { ItemInterface } from "@interfaces//storeItem"

const MainLayout = ({children, ...rest}: FlexProps) => {
    const { products, isLoadingProducts } = useFetchProducts()
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

    // load products to store
    const [ store, setStore ] = useRecoilState<ItemInterface[]>(productsState)    
    useEffect(() => {
        isLoadingProducts   ? notify('preparing ...')
                            : setStore(products!) 
        // console.log('store update: ', store)
    }, [products])

    // load cart from local-storage
    const [ cart, setCart ] = useRecoilState<CartItemInterface[]>(cartState)
    useEffect(() => {
        const cartData = localStorage.getItem("cart")
        // console.log('storage: ', cartData)
        const parsedData = JSON.parse(cartData!)
        parsedData && setCart(parsedData)
    }, [])
    // console.log('cart update: ', cart)

    return (
        <Box
            bgColor='blue.50'
            minHeight='100vh'
            px={{base:'1rem', sm:'2rem', md:'4rem'}}
            {...rest}
        >
            {isLoadingProducts && <LoadingOverlay/>}
            <CustomHeader />
            <AnchorMenuNav/>

            {children}

            <TokoFooter />
        </Box>
    )
}

export default MainLayout