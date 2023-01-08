import { useState } from "react"
import { Box, Divider, Flex, Skeleton, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import { FiShoppingCart } from "react-icons/fi"
import { TbFileInvoice } from "react-icons/tb"
import { useFetchPurchases } from "@hooks/useFetchPurchases"
import { getSession } from 'next-auth/react'

// TODO: apply middleware to all admin-area
// protect admin-area route
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

const AdminAreaPage = () => {
    const [ userCategory, setUserCategory ] = useState('admin')
    const { purchases, isLoadingPurchases } = useFetchPurchases()
    console.log(purchases)

    return (
        <MainLayout>
            {
                userCategory === 'admin' &&
                <Flex gap={2}>
                    <FormSubmitButton href="/admin-area/products">Manage Products</FormSubmitButton>
                </Flex>
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
                <Flex justifyContent='right' mt={4}>
                    <FormSubmitButton href="/checkout" buttonColor="green.100" >Checkout</FormSubmitButton>
                </Flex>
            </BlockContainer>

            <Box mt={4} />

            <BlockContainer>
                <Flex alignItems='center'>
                    <Box as={TbFileInvoice} mr={2}/>
                    <Text fontWeight={600} >Shopping history</Text>
                </Flex>
                <Divider />
                    <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                        {   isLoadingPurchases ?
                            <Box>
                                <Skeleton h={6} mb={2} />
                                <Skeleton h={4} />
                            </Box>
                        :   
                            purchases!.map((purchase) => {
                                const date = new Date(`${purchase.createdAt}`).toLocaleDateString('en-EN', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric'
                                })
                                const time = new Date(`${purchase.createdAt}`).toLocaleTimeString()
                                
                                return (
                                    <Box>
                                        <small>purchased on</small>
                                        <Box>
                                            {date}
                                        </Box>
                                        <Box>
                                            {time}
                                        </Box>
                                        <Divider />
                                    </Box>
                                )
                            })
                        }
                </Box>
            </BlockContainer>
        </MainLayout>
    )
}
export default AdminAreaPage