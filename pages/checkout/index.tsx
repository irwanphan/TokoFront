import { Box, Divider, Flex, Grid, GridItem, Text, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import SessionProfile from "@units/SessionProfile"
import { useForm, SubmitHandler, Resolver } from "react-hook-form"
import FormInput from "@elements/FormInput"
import { useEffect, useState } from "react"
import { CartItemCheckoutInterface, CartItemInterface } from "@interfaces//cartItem"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { cartState, checkCartState } from "@contexts/cart"
import LoadingOverlay from "@elements/LoadingOverlay"
import axios from "axios"
import useCartTotal from "@hooks/useCartTotal"
import WarningBox from "@elements/WarningBox"
import { useRouter } from "next/router"
import { FiShoppingBag } from "react-icons/fi"
import { useAuth } from "@contexts/authContext"
import LoadingBlock, { LoadingBlockList } from "@elements/LoadingBlock"

interface UserInterface {
    id: string | null | undefined
    email: string | null | undefined
    name: string | null | undefined
}
interface IFormInput {
    address: string
    city: string
    province: string
    postal: string
    total: number
    note: string
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
                    message: 'Address is required.'
                }}
                : !values.city ?
                { city: {
                        type: 'required',
                        message: 'City is required.'
                }}
                : !values.province ?
                { province: {
                        type: 'required',
                        message: 'Province is required.'
                }}
                : !values.postal ?
                { postal: {
                        type: 'required',
                        message: 'Postal code is required.'
                }}
                : {}
    }
}

// export async function getServerSideProps(context:any) {
//     // Check if user is authenticated
//     const { session } = useAuth()
//     // If not, redirect to the homepage
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }
//     return {
//         props: {}
//     }
// }

const CheckoutPage = () => {
    const { session, isLoadingSession } = useAuth()
    // console.log(session)

    const checkCart = useRecoilValue<CartItemCheckoutInterface[]|any>(checkCartState)
    const setCart = useSetRecoilState(cartState)

    const [ isLoading, setIsLoading ] = useState(true)
    const [ isDisabled, setDisabled ] = useState(false)
    
    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            address: '',
            city: '',
            province: '',
            postal: '',
            total: 0,
            note: '',
            orders: [],
            user: { email: '', name: '' }
        },
        resolver
    })

    const { total, isLoadingTotal } = useCartTotal()
    // console.log(total)

    // if ()
    // const { user:currentUser, isLoadingUser } = useFetchUser(user.id)
    // console.log(currentUser)

    useEffect(() => {
        if(session !== null) {
            setIsLoading(false)
        }
    }, [session])

    const router = useRouter()
    const createPurchaseOrder = (data:any) => axios.post('/api/purchases', data);
    const toast = useToast()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // TODO: disable form when submit'
        console.log('running', data)
        setDisabled
        setIsLoading(true)
        toast({title:'Submitting ...'})
        // console.log(checkCart)
        data.orders = checkCart
        data.total = total!
        data.user.email = session!.user.email
        data.user.name = session!.user.user_metadata.full_name
        data.user.id = session!.user.id
        console.log(data)
        // const purchase = await createPurchaseOrder(data)
        
        // console.log('purchase', purchase)
        // localStorage.removeItem("cart")
        // setCart([])
        toast({title:'Purchase order submitted', status:'success'})
        toast({title:'Redirecting ...'})
        setIsLoading(false)
        // router.push(`/admin-area/purchases/${purchase.data.id}`)
    }

    if (isLoading) {
        return (
            <LoadingBlock />
        )
    }

    return (
        <MainLayout>
            <Box textAlign='left' mb={8}>
                <Text fontSize={32}>
                    Your Cart
                </Text>
            </Box>
            <Grid templateColumns={{base: '100%', md: '1fr 1fr'}} gap={4}>
                <GridItem>
                    <BlockContainer>
                        <CartItems />
                        <Flex justifyContent='right' mt={4}>
                            <FormSubmitButton href="/products" buttonColor="green.100">
                                <Box as={FiShoppingBag} mr={1} fontSize={20} />
                                    {
                                        checkCart.length === 0  ? 'Go Shopping'
                                                                : 'Continue Shopping'
                                    }
                            </FormSubmitButton>
                        </Flex>
                    </BlockContainer>
                </GridItem>

                <GridItem>
                    {
                        checkCart.length > 0 ?
                        <BlockContainer>
                            <Box>
                                You&apos;re login as
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
                                autoFocus
                                register={register} />
                                { errors?.address && <WarningBox>{errors.address.message}</WarningBox> }
                            <Flex 
                                gap={{ base: 0, md: 3 }} 
                                direction={{ base: 'column', md: 'row' }}>
                                <Box>
                                    <FormInput 
                                        name='city'
                                        label='City' 
                                        placeholder="eg. Jakarta Pusat"
                                        isDisabled={isDisabled}
                                        autoFocus
                                        register={register} />
                                    { errors?.city && <WarningBox>{errors.city.message}</WarningBox> }
                                </Box>
                                <Box>
                                    <FormInput 
                                        name='province'
                                        label='Province' 
                                        placeholder="eg. DKI Jakarta"
                                        isDisabled={isDisabled}
                                        autoFocus
                                        register={register} />
                                    { errors?.province && <WarningBox>{errors.province.message}</WarningBox> }
                                </Box>
                                <Box>
                                    <FormInput 
                                        name='postal'
                                        label='Postal Code' 
                                        placeholder="eg. 12930"
                                        isDisabled={isDisabled}
                                        autoFocus
                                        register={register} />
                                    { errors?.postal && <WarningBox>{errors.postal.message}</WarningBox> }
                                </Box>
                            </Flex>

                            <FormInput 
                                type="textarea"
                                name='note'
                                label='Note' 
                                placeholder="eg. please cover the stuff with black plastic"
                                isDisabled={isDisabled}
                                register={register} />

                            <Divider mt={8} mb={4} />

                            <Flex justifyContent='flex-end' gap={2} alignItems='flex-end'
                                direction={{ base: 'column', md: 'row' }}
                            >
                                <FormSubmitButton href="/" >Back to Store</FormSubmitButton>
                                <FormSubmitButton notLink 
                                    buttonColor="green.100"
                                    isDisabled={isDisabled}
                                    onClick={handleSubmit(onSubmit)} >
                                    Proceed Order
                                </FormSubmitButton>
                            </Flex>
                        </BlockContainer>
                        : <></>
                    }
                </GridItem>
            </Grid>
        </MainLayout>
    )
}

export default CheckoutPage