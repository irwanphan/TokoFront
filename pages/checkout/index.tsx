import { Box, Divider, Flex, Grid, GridItem, Text, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import SessionProfile from "@units/SessionProfile"
import { getSession, useSession } from "next-auth/react"
import { useForm, SubmitHandler, Resolver } from "react-hook-form"
import FormInput from "@elements/FormInput"
import { useState } from "react"
import { CartItemCheckoutInterface } from "@interfaces//cartItem"
import { useRecoilValue } from "recoil"
import { checkCartState } from "@contexts/cart"
import LoadingOverlay from "@elements/LoadingOverlay"
import axios from "axios"
import useCartTotal from "@hooks/useCartTotal"
import WarningBox from "@elements/WarningBox"

interface UserInterface {
    email: string | null | undefined
    name: string | null | undefined
}
interface IFormInput {
    address: string
    city: string
    province: string
    postal: string
    total: number
    orders: CartItemCheckoutInterface[]
    user: UserInterface
}
const resolver: Resolver<IFormInput> = async (values) => {
    return {
        values: values.address ? values : 
                values.city ? values :
                values.province ? values :
                values.postal ? values :
                {},
        errors: !values.address ?
                { address: {
                    type: 'required',
                    message: 'Address is required.',
                }}
                : !values.city ?
                { city: {
                        type: 'required',
                        message: 'City is required.',
                }}
                : !values.province ?
                { province: {
                        type: 'required',
                        message: 'Province is required.',
                }}
                : !values.postal ?
                { postal: {
                        type: 'required',
                        message: 'Postal code is required.',
                }}
                : {}
    }
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

    const [ isLoading, setIsLoading ] = useState(true)
    const [ isDisabled, setDisabled ] = useState(false)
    
    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            address: '',
            city: '',
            province: '',
            postal: '',
            total: 0,
            orders: [],
            user: { email: '', name: '' }
        },
        resolver
    })

    const { total, isLoadingTotal } = useCartTotal()
    // console.log(total)

    const createPurchaseOrder = (data:any) => axios.post('/api/purchases', data);
    const toast = useToast()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // TODO: disable form when submit
        setDisabled
        setIsLoading(true)
        toast({title:'Saving...'})
        // console.log(checkCart)
        data.orders = checkCart
        data.total = total!
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
                            { errors?.address && <WarningBox>{errors.address.message}</WarningBox> }
                        <Flex gap={3}>
                            <Box>
                                <FormInput 
                                    name='city'
                                    label='City' 
                                    placeholder="eg. Jakarta Pusat"
                                    isDisabled={isDisabled}
                                    register={register} />
                                { errors?.city && <WarningBox>{errors.city.message}</WarningBox> }
                            </Box>
                            <Box>
                                <FormInput 
                                    name='province'
                                    label='Province' 
                                    placeholder="eg. DKI Jakarta"
                                    isDisabled={isDisabled}
                                    register={register} />
                                { errors?.province && <WarningBox>{errors.province.message}</WarningBox> }
                            </Box>
                            <Box>
                                <FormInput 
                                    name='postal'
                                    label='Postal Code' 
                                    placeholder="eg. 12930"
                                    isDisabled={isDisabled}
                                    register={register} />
                                { errors?.postal && <WarningBox>{errors.postal.message}</WarningBox> }
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