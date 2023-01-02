import { Box, FlexProps } from "@chakra-ui/react"
import { cartState } from "@contexts/cart"
import { productsState, useFetchProducts } from "@contexts/products"
import LoadingOverlay from "@elements/LoadingOverlay"
import { CartItemInterface } from "@interfaces//cartItem"
import { ItemInterface } from "@interfaces//storeItem"
import TokoFooter from "@libs/components/TokoFooter"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import AnchorMenuNav from "../AnchorMenuNav"
import CustomHeader from "../CustomHeader"

const MainLayout = ({children, ...rest}: FlexProps) => {
    const { products, isLoadingProducts } = useFetchProducts()

    // load products to store
    const [ store, setStore ] = useRecoilState<ItemInterface[]>(productsState)    
    useEffect(() => {
        isLoadingProducts   ? console.log('loading products ...')
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
            {/* {isLoadingProducts && <LoadingOverlay/>} */}
            <CustomHeader />
            <AnchorMenuNav/>

            {children}

            <TokoFooter />
        </Box>
    )
}

export default MainLayout