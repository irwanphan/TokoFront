import MainLayout from "@libs/layouts/MainLayout"
import { Box, Grid, GridItem, Text } from "@chakra-ui/react"
import BlockContainer, { BlockContainerLink } from "@elements/BlockContainer"
import { dummyItems, ItemInterface } from "@libs/interfaces/storeItem"

const ProductsPage = () => {
    return (
        <MainLayout>
            <Box textAlign='left' mt={12} mb={8}>
                <Text fontSize={32}>
                    All Products
                </Text>
            </Box>

            <Grid templateColumns={{base: '1fr', sm:'1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr'}} gap={4}>
                {dummyItems.map((item:ItemInterface) => {
                    return (
                        <GridItem key={item.id}>
                            <BlockContainerLink href={`/products/${item.id}`} 
                                product={item}
                                // bgColor='green.50'
                            />
                        </GridItem>
                    )
                })}
            </Grid>
        </MainLayout>
    )
}

export default ProductsPage