import { Box, Divider, Flex, Grid, GridItem, Text, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import SessionProfile from "@units/SessionProfile"
import { useForm, SubmitHandler, Resolver } from "react-hook-form"
import FormInput from "@elements/FormInput"
import { useEffect, useState } from "react"
import { CartItemCheckoutInterface } from "@interfaces//cartItem"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { cartState, checkCartState } from "@contexts/cart"
import axios from "axios"
import useCartTotal from "@hooks/useCartTotal"
import WarningBox from "@elements/WarningBox"
import { useRouter } from "next/router"
import { FiShoppingBag } from "react-icons/fi"
import { useAuth } from "@contexts/authContext"
import LoadingBlock from "@elements/LoadingBlock"
import { checkoutResolver, IFormInput } from "@interfaces//checkout"

// import { MidtransClient } from "midtrans-node-client"
// let snap = new MidtransClient.Snap({
//     // Set to true if production.
//     isProduction : false,
//     serverKey : process.env.MID_SERVER_KEY_SANDBOX,
//     clientKey : process.env.MID_CLIENT_KEY_SANDBOX,
// })

const resolver: Resolver<IFormInput> = async (values) => {
    return checkoutResolver(values)
}

// TODO: Check if user is authenticated

const CheckoutPage = () => {
    const { session, isLoadingSession } = useAuth()
    // console.log(session)
    const checkCart = useRecoilValue<CartItemCheckoutInterface[]|any>(checkCartState)
    const setCart = useSetRecoilState(cartState)
    const { total, isLoadingTotal } = useCartTotal()
    // console.log(total)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ isDisabled, setDisabled ] = useState(false)
    // handling form
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

    useEffect(() => {
        if(session !== null) {
            setIsLoading(false)
        }
    }, [session])

    // get snap.js on <script/> for Midtrans Client
    // useEffect(() => {
    //     // TODO: change to MID_URL when PRODUCTION
    //     const midtransScriptUrl = process.env.MID_URL_SANDBOX 
    //     const myMidtransClientKey = process.env.MID_CLIENT_KEY
      
    //     let scriptTag:any = document.createElement('script')
    //     scriptTag.src = midtransScriptUrl
    //     // optional if you want to set script attribute
    //     // for example snap.js have data-client-key attribute
    //     scriptTag.setAttribute('data-client-key', myMidtransClientKey);
      
    //     document.body.appendChild(scriptTag);
    //     return () => {
    //         document.body.removeChild(scriptTag);
    //     }
    // }, [])

    // const getMidToken = async () => {
    //     const res:any = axios.get('/api/payment')
    //         .then((res) => {
    //                 // console.log(res.data.token)
    //                 router.push(res.data.token)       
    //         })
    //         .catch((e) => {throw(e)})
    // }

    const router = useRouter()
    const createUserIfNotExist = (data:any) => axios.post('/api/users', data)
    const createSaleOrder = (data:any) => axios.post('/api/sales', data)
    const toast = useToast()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // console.log('running', data)
        setDisabled
        setIsLoading(true)
        toast({title:'Submitting ...'})
        data.orders = checkCart
        data.total = total!
        data.user.email = session!.user.email
        data.user.name = session!.user.user_metadata.name
        data.user.id = session!.user.id
        console.log(data)

        const userData = {
            id: session!.user.id,
            email: session!.user.email,
            name: session!.user.user_metadata.name,
            image: session!.user.user_metadata.picture
        }

        // toast({title:'Creating Transaction', status:'success'})
        // const token = getMidToken()

        const user = await createUserIfNotExist(userData)
        // console.log('user: ', user)

        const sale = await createSaleOrder(data)
        // console.log('sale: ', sale)
        
        // TEST: comment localstorage.remove, setCart([]), and router.push
        localStorage.removeItem("cart")
        setCart([])
        toast({title:'Sale order submitted', status:'success'})
        toast({title:'Redirecting ...'})
        setIsLoading(false)
        router.push(`/admin-area/sales/${sale.data.id}`)
    }

    if (isLoading) {
        return (
            <MainLayout>
                <LoadingBlock />
            </MainLayout>
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