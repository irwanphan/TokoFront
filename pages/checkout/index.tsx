import { Box, Divider, Flex, Grid, GridItem, Text, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import SessionProfile from "@units/SessionProfile"
import { getSession, useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import FormInput from "@elements/FormInput"
import { useState } from "react"
import { CartItemCheckoutInterface } from "@interfaces//cartItem"
import { useRecoilValue } from "recoil"
import { checkCartState } from "@contexts/cart"
import LoadingOverlay from "@elements/LoadingOverlay"
import axios from "axios"

interface UserInterface {
    email: string | null | undefined
    name: string | null | undefined
}
interface IFormInput {
    address: string
    city: string
    province: string
    postal: string
    orders: CartItemCheckoutInterface[]
    user: UserInterface
}

export async function getServerSideProps(context:any) {
    // Check if user is authenticated
    const session = await getSession(context);
    // If not, redirect to the homepage
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {}
    }
}

const CheckoutPage = () => {
    const { data: session } = useSession()
    // console.log(session)
    const checkCart = useRecoilValue<CartItemCheckoutInterface[]|any>(checkCartState)

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setDisabled ] = useState(false)
    
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            address: '',
            city: '',
            province: '',
            postal: '',
            orders: [],
            user: { email: '', name: '' }
        }
    })

    const createPurchaseOrder = (data:any) => axios.post('/api/purchases', data);
    const toast = useToast()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // TODO: disable form when submit
        // setDisabled
        setIsLoading(true)
        toast({title:'Saving...'})
        // console.log(checkCart)
        data.orders = checkCart
        data.user.email = session!.user.email
        data.user.name = session!.user.name
        // console.log(data)
        await createPurchaseOrder(data)
        setIsLoading(false)
        toast({title: data.address})
        toast({title:'Saved', status:'success'})
    }

    return (
        <MainLayout>
            { isLoading ?? <LoadingOverlay /> }
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
                                    name='postal'
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