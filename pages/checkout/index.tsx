import { Box, Divider, Flex, Grid, GridItem, Text, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import SessionProfile from "@units/SessionProfile"
import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import FormInput from "@elements/FormInput"
import { useState } from "react"

interface IFormInput {
    address: string
    city: string
    province: string
    postal: string
}

const CheckoutPage = () => {
    const { data: session } = useSession()
    // console.log(session)

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setDisabled ] = useState(false)
    
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            address: '',
            city: '',
            province: '',
            postal: ''
        }
    })

    const toast = useToast()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // setDisabled
        setIsLoading(true)
        toast({title:'Saving...'})
        // await createProduct(data)
        setIsLoading(false)
        toast({title: data.address})
        toast({title:'Saved', status:'success'})
    }

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

                        <FormInput 
                            name='address'
                            label='Shipping Address' 
                            placeholder="eg. Jalan Sudirman, no 72"
                            isDisabled={isDisabled}
                            register={register} />
                        <Flex gap={3}>
                            <Box>
                                <FormInput 
                                    name='city'
                                    label='City' 
                                    placeholder="eg. Jakarta Pusat"
                                    isDisabled={isDisabled}
                                    register={register} />
                            </Box>
                            <Box>
                                <FormInput 
                                    name='province'
                                    label='Province' 
                                    placeholder="eg. DKI Jakarta"
                                    isDisabled={isDisabled}
                                    register={register} />
                            </Box>
                            <Box>
                                <FormInput 
                                    name='postal code'
                                    label='Postal Code' 
                                    placeholder="eg. 12930"
                                    isDisabled={isDisabled}
                                    register={register} />
                            </Box>
                        </Flex>

                        <Divider mt={8} mb={4} />

                        <Flex justifyContent='flex-end' gap={2}>
                            <FormSubmitButton href="/" >Back to Store</FormSubmitButton>
                            <FormSubmitButton notLink 
                                buttonColor="green.100"
                                isDisabled={isDisabled}
                                onClick={handleSubmit(onSubmit)} >
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