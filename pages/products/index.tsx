import MainLayout from "@libs/layouts/MainLayout"
import { Box, Text } from "@chakra-ui/react"
import TokoCatalog from "@libs/components/TokoCatalog"

const ProductsPage = () => {
    return (
        <MainLayout>
            <Box textAlign='left' mt={12} mb={8}>
                <Text fontSize={32}>
                    All Products
                </Text>
            </Box>

            <TokoCatalog />
        </MainLayout>
    )
}

export default ProductsPage