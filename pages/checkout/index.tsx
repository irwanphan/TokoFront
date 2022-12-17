import { Grid } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"

const CheckoutPage = () => {
    return (
        <MainLayout>
            <Grid templateColumns='1fr 1fr' gap={4}>
                <BlockContainer>
                    <CartItems />
                </BlockContainer>
            </Grid>
        </MainLayout>
    )
}

export default CheckoutPage