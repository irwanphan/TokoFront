import { Box, Grid, GridItem, Text } from "@chakra-ui/react"
import BlockContainer, { BlockContainerLink, BlockImage } from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import { useRouter } from "next/router"

import { useRecoilState, useRecoilValue } from "recoil"
import { cartState } from "@libs/contexts/recoil"

import { dummyItems } from "@data//dummy_items"
import { useEffect, useState } from "react"

const ProductDetailView = () => {
    const router = useRouter()
    const {pid}:any = router.query
    // console.log(pid)

    const [qid, setQid] = useState<number|any>()
    useEffect(() => {
        let qpid:any = parseInt(pid)
        setQid(qpid)
    },[pid])

    const [cart, setCart] = useRecoilState(cartState)

    if (!qid) {
        return (
            <MainLayout>
                nothing
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <Grid templateColumns='1fr 1fr' gap={8}>
                <GridItem>
                    <BlockImage />
                </GridItem>
                <GridItem>
                    <Text fontSize={24} fontWeight={600}>
                        {/* {title} */}
                        {dummyItems[qid].name}
                    </Text>
                    <Text mb={3}>
                        {/* IDR 800000 */}
                        IDR {dummyItems[qid].price}
                    </Text>
                    <Text fontSize={12} mt={1} color='blackAlpha.800'>
                        {/* {description} */}
                        It's right there
                    </Text>

                    <FormSubmitButton
                        buttonColor='white'
                        notLink
                        onClick={() => {
                            console.log(pid)
                        }}
                        >
                        Add to Cart
                    </FormSubmitButton>
                </GridItem>
            </Grid>

            <CartItems />
        </MainLayout>
    )
}

export const CartItems = () => {
    const cart = useRecoilValue(cartState)

    if (Object.keys(cart).length === 0) {
        return <Box>No Items</Box>
    }
    return (
        <Box>something</Box>
    )
}

export default ProductDetailView