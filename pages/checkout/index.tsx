import { Box, Divider, Flex, FormLabel, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"

const CheckoutPage = () => {
    return (
        <MainLayout>
            <Box textAlign='left' mb={8}>
                <Text fontSize={32}>
                    Your Cart
                </Text>
            </Box>
            <Grid templateColumns='1fr 1fr' gap={4}>
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
                                <Text fontWeight={600}>Irwan Phan</Text>
                                <Text fontSize={12}>
                                    Some Address Street, No. 88
                                </Text>
                                <Text fontSize={12}>
                                    Pontianak, Indonesia
                                </Text>
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