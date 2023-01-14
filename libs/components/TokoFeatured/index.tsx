import { Box } from "@chakra-ui/react"
import { productsState } from "@contexts/products"
import CatalogFullColumn from "@units/CatalogFullColumn"
import { useRecoilValue } from "recoil"

const TokoFeatured = () => {
    const store = useRecoilValue(productsState)
    const featuredProduct = store[2] //dummy here
    
    return (
        <Box>
            <CatalogFullColumn  
                bgColor='green.100'
                product={featuredProduct}
                haveButton
                buttonText='Shop Now'
            />
        </Box>
    )
}

export default TokoFeatured