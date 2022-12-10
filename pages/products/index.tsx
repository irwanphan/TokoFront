import MainLayout from "@libs/layouts/MainLayout"
import { Box, Grid, GridItem, Text } from "@chakra-ui/react"
import BlockContainer, { BlockContainerLink } from "@elements/BlockContainer"

const ProductsPage = () => {
    return (
        <MainLayout>
            <Box textAlign='left' mt={12} mb={8}>
                <Text fontSize={32}>
                    All Products
                </Text>
            </Box>

            <Grid templateColumns='1fr 1fr 1fr' gap={4}>
                <GridItem>
                    <BlockContainerLink href='/' 
                        title='Set Your Sight Straight'
                        description={`It's right there`}
                        bgColor='green.50'
                    />
                </GridItem>
                <GridItem>
                    <BlockContainer>asdf</BlockContainer>
                </GridItem>
            </Grid>
        </MainLayout>
    )
}

export default ProductsPage