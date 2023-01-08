import { Box, FlexProps, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import LoadingOverlay from "@elements/LoadingOverlay"
import CustomHeader from "../CustomHeader"
import AnchorMenuNav from "../AnchorMenuNav"
import TokoFooter from "@libs/components/TokoFooter"

import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { cartState } from "@contexts/cart"
import { productsState } from "@contexts/products"
import { useFetchCatalog } from "@hooks/useFetchCatalog"
import { CartItemInterface } from "@interfaces//cartItem"
import { ItemInterface } from "@interfaces//storeItem"

const MainLayout = ({children, ...rest}: FlexProps) => {
    const { catalog, isLoadingCatalog } = useFetchCatalog()
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
        isLoadingCatalog    ? notify('preparing ...')
                            : setStore(catalog!) 
        // console.log('catalog update: ', catalog)
    }, [catalog])

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
            {isLoadingCatalog && <LoadingOverlay/>}
            <CustomHeader />
            <AnchorMenuNav/>

            {children}

            <TokoFooter />
        </Box>
    )
}

export default MainLayout