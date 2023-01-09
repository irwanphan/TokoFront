import { useState } from "react"
import { Box, Divider, Flex, List, ListItem, Skeleton, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import { FiEdit, FiShoppingCart, FiSlash } from "react-icons/fi"
import { TbFileInvoice } from "react-icons/tb"
import { useFetchPurchases } from "@hooks/useFetchPurchases"
import { getSession } from 'next-auth/react'
import TriggerBox from "@units/TriggerBox"
import { useRouter } from "next/router"
import { LoadingBlockList } from "@elements/LoadingBlock"

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
    // console.log(purchases)
    const router = useRouter()

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
                        <List className="purchase-items">
                            {   isLoadingPurchases ?
                                <LoadingBlockList />
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
                                        <ListItem key={purchase.id} 
                                            mb={3} // seen from Divider 
                                        >
                                            <Flex alignItems='center' 
                                                fontSize={14}
                                            >
                                                <Text>{date}</Text>                                            
                                            </Flex>
                                            <Flex
                                                color='gray.600'
                                                fontSize={12}
                                                gap={1}
                                                mb={4} // to Divider
                                                justifyContent='space-between'
                                            >
                                                <Flex direction='column' >
                                                    <Flex gap={2}>
                                                        <Text>Type of items</Text>                                            
                                                        <Text fontWeight={600}>{(purchase.detail).length}</Text>                                            
                                                    </Flex>
                                                    <Flex gap={2}>
                                                        <Text>Total purchase</Text>                                            
                                                        <Text fontWeight={600}>{purchase.total}</Text>                                            
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={2} alignItems='flex-end'>
                                                    <TriggerBox
                                                        icon={FiEdit}
                                                        hoverColor='green.100'
                                                        onClick={() => {
                                                            router.replace(`/admin-area/purchases/${purchase.id}`)
                                                        }}
                                                    >View Detail
                                                    </TriggerBox>
                                                </Flex>
                                            </Flex>
                                            <Divider />
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                </Box>
            </BlockContainer>
        </MainLayout>
    )
}
export default AdminAreaPage