import { Grid, GridItem, Text } from "@chakra-ui/react"
import BlockContainer, { BlockContainerLink, BlockImage } from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import { useRouter } from "next/router"

const ProductDetailView = () => {
    const router = useRouter()
    const {pid} = router.query

    return (
        <MainLayout>
            <Grid templateColumns='1fr 1fr' gap={8}>
                <GridItem>
                    <BlockImage />
                </GridItem>
                <GridItem>
                    <Text fontSize={24} fontWeight={600}>
                        {/* {title} */}
                        Set Your Sight Straight
                    </Text>
                    <Text mb={3}>
                        IDR 800000
                    </Text>
                    <Text fontSize={12} mt={1} color='blackAlpha.800'>
                        {/* {description} */}
                        It's right there
                    </Text>

                    <FormSubmitButton
                        buttonColor='white'
                        href='/'
                        >
                        Add to Cart
                    </FormSubmitButton>
                </GridItem>
            </Grid>
        </MainLayout>
    )
}

export default ProductDetailView