import { Box, Divider, Flex, FormLabel, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import SessionProfile from "@units/SessionProfile"
import { useSession } from "next-auth/react"

const CheckoutPage = () => {
    const { data: session } = useSession()
    // console.log(session)
    return (
        <MainLayout>
            <Box textAlign='left' mb={8}>
                <Text fontSize={32}>
                    Your Cart
                </Text>
            </Box>
            <Grid templateColumns={{base: '1fr', md: '1fr 1fr'}} gap={4}>
                <GridItem>
                    <BlockContainer>
                        <CartItems />
                    </BlockContainer>
                </GridItem>

                <GridItem>
                    <BlockContainer>
                        <Box>
                            You're login as
                            <Box mt={1} mb={3}
                                borderLeftColor='blue.300'
                                borderLeftWidth='0.5rem'
                                borderLeftStyle='solid'
                                paddingLeft={2}>
                                <SessionProfile session={session} />
                            </Box>
                        </Box>

                        <FormLabel>Shipping Address</FormLabel>
                        <Input layerStyle='formInputBase' />
                        <Flex gap={3}>
                            <Box>
                                <FormLabel>City</FormLabel>
                                <Input layerStyle='formInputBase' />
                            </Box>
                            <Box>
                                <FormLabel>State</FormLabel>
                                <Input layerStyle='formInputBase' />
                            </Box>
                            <Box>
                                <FormLabel>Postal Code</FormLabel>
                                <Input layerStyle='formInputBase' />
                            </Box>
                        </Flex>

                        <Divider mt={8} mb={4} />

                        <Flex justifyContent='flex-end' gap={2}>
                            <FormSubmitButton notLink buttonColor="green.200">
                                Proceed Order
                            </FormSubmitButton>
                        </Flex>
                    </BlockContainer>
                </GridItem>
            </Grid>
        </MainLayout>
    )
}

export default CheckoutPage