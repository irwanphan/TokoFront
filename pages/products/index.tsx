import MainLayout from "@libs/layouts/MainLayout"
import { Box, Text } from "@chakra-ui/react"
import TokoCatalog from "@libs/components/TokoCatalog"
import { useFetchSettings } from "@hooks/useFetchSettings"

const ProductsPage = () => {
    const { settings, isLoadingSettings } = useFetchSettings()

    if (isLoadingSettings) {
        return (
            <MainLayout>
                <LoadingOverlay />
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <Box textAlign='left' mt={12} mb={8}>
                <Text fontSize={32}>
                    All Products
                </Text>
            </Box>

            <TokoCatalog settings={settings}/>
        </MainLayout>
    )
}

export default ProductsPage