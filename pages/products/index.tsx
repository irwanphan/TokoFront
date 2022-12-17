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

            <Grid templateColumns='1fr 1fr 1fr 1fr' gap={4}>
                {dummyItems.map((item:ItemInterface) => {
                    return (
                        <GridItem>
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