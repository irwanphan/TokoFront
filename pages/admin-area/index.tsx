import { BaseSyntheticEvent, useEffect, useState } from "react"
import { Box, Divider, Flex, FormLabel, Input, List, ListItem, Select, Text, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import TriggerBox from "@units/TriggerBox"
import LoadingBlock, { LoadingBlockList } from "@elements/LoadingBlock"
import { FiEdit, FiSave, FiSettings, FiShoppingBag, FiShoppingCart } from "react-icons/fi"
import { TbFileInvoice } from "react-icons/tb"

import MainLayout from "@libs/layouts/MainLayout"
import { CartItems } from "@libs/components/Cart"
import { useFetchPurchasesByUserId } from "@hooks/useFetchSalesByUserId"
import { useRecoilValue } from "recoil"
import { checkCartState } from "@contexts/cart"
import { useRouter } from "next/router"
import { useAuth } from "@contexts/authContext"
import TokoShoppingHistory from "@components/TokoShoppingHistory"
import { useFetchSettings } from "@hooks/useFetchSettings"
import TokoBusinessSetting from "@components/TokoBusinessSetting"

// TODO: apply middleware to all admin-area
// protect admin-area route

const AdminAreaPage = () => {
    const { session, isLoadingSession } = useAuth()
    const { settings, isLoadingSettings } = useFetchSettings()

    const [ isLoading, setIsLoading ] = useState(true)

    const router = useRouter()
    const toast = useToast()
    useEffect(() => {
        if (!session) {
            toast({title:'Redirecting ...', description:'User Unauthorized', status:'warning'})
            router.push('/')
        }
    }, [ session, isLoadingSession ])

    const checkCart = useRecoilValue(checkCartState)
    const [ userCategory, setUserCategory ] = useState('admin')

    useEffect(() => {
        if (session && settings) {
            console.log("settings: ", settings)
            setIsLoading(false)
        }
    }, [ isLoadingSession, isLoadingSettings ])

    if (isLoading) {
        <MainLayout>
            <LoadingBlock/>
        </MainLayout>
    }

    return (
        <MainLayout>
            {
                userCategory == 'admin' ?
                <Flex 
                    gap={2} maxW='full'
                    direction={{ base: 'column', md: 'row' }}
                >
                    <FormSubmitButton href="/admin-area/products">Manage Products</FormSubmitButton>
                    <FormSubmitButton href="/admin-area/users">Manage Users</FormSubmitButton>
                </Flex>
                : <></>
            }
            <Box mt={4} />

            <BlockContainer>
                <Flex alignItems='center'>
                    <Box as={FiShoppingCart} mr={2} />
                    <Text fontWeight={600} >In your cart</Text>
                </Flex>
                <Divider />
                <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                    <CartItems />
                </Box>
                {
                    checkCart.length > 0 ?
                    <Flex justifyContent='right' mt={4}>
                        <FormSubmitButton href="/checkout" buttonColor="green.100">
                            Checkout
                        </FormSubmitButton>
                    </Flex>
                    : <></>
                }
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

            <Box mt={4} />

            <TokoShoppingHistory userId={session?.user.id} />

            <Box mt={4} />

            <TokoBusinessSetting settings={settings} />
            
        </MainLayout>
    )
}
export default AdminAreaPage