import { Box, Flex, Divider, Text, useToast, List, ListItem, useDisclosure } from "@chakra-ui/react"
import { productsState, loadProducts } from "@contexts/products"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { ItemInterface } from "@interfaces//storeItem"
import MainLayout from "@libs/layouts/MainLayout"
import ModalPopup from "@units/ModalPopup"
import { useState, useEffect } from "react"
import { FiEdit, FiPackage, FiSlash } from "react-icons/fi"
import { useRecoilState } from "recoil"

const ManageProductsPage = () => {
    const [ userCategory, setUserCategory ] = useState('admin')
    const [ store, setStore ] = useRecoilState<ItemInterface[]>(productsState)
    const [ isLoadingProducts, setIsLoadingProducts ] = useState<boolean>(true)
    const toast = useToast()

    useEffect(() => {
        const products = loadProducts()
        .then(res => setStore(res))
        .then(() => setIsLoadingProducts(false))
        .catch(e => {
            toast({
                title: 'Error',
                description: `You're not connected to our server!`,
                render: () => (
                    <BlockContainer py={4} px={6} bgColor="green.100">You're not connected to our server!</BlockContainer>
                )
            })
            // console.error(e.response.status)
        })
    }, [])

    // handling delete modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ scope, setScope ] = useState<ItemInterface>()
    const modalProps = {
        title: `Mark ${scope?.name} as Inactive`,
        texts: 'Are you really OK with this decision?',
        button: 'OK',
        action: () => {
            // handleMarkInactive(scope)
            onClose()
        }
    }
    
    return (
        <MainLayout>
            <Flex gap={2}>
                <FormSubmitButton href="/admin-area">Admin Dashboard</FormSubmitButton>
            </Flex>
            <Box mt={4} />

            <BlockContainer>
                <Box>
                    <Flex alignItems='center'>
                        <Box as={FiPackage} mr={2} />
                        <Text fontWeight={600} >Product List</Text>
                    </Flex>
                </Box>
                <Divider />
                <FormSubmitButton href="/admin-area/products/create" buttonColor="green.100" >+ New</FormSubmitButton>
                <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                    <Box>
                        <List className="cart-items">
                            {store.map((item:ItemInterface) => {
                                return (
                                    <ListItem key={item.id} mb={2} >
                                        <Flex alignItems='center' mb={1}>
                                            {item?.name}
                                        </Flex>
                                        <Flex
                                            color='gray.600'
                                            fontSize={12}
                                            gap={1}
                                            justifyContent='space-between'
                                        >
                                            <Flex direction='column' >
                                                <Flex gap={2}>
                                                    <Text>Current stock</Text>                                            
                                                    <Text fontWeight={600}>{item.currentStock}</Text>                                            
                                                </Flex>
                                                <Flex gap={2}>
                                                    <Text>Price</Text>                                            
                                                    <Text fontWeight={600}>{item.price}</Text>                                            
                                                </Flex>
                                            </Flex>
                                            <Flex gap={2}>
                                                <Flex 
                                                    p={1} h={6}
                                                    borderWidth='1px'
                                                    borderStyle='solid'
                                                    borderColor='gray.600'
                                                    cursor='pointer'
                                                    alignItems='center'
                                                    direction='row'
                                                    fontSize={12}
                                                    transition='0.3s ease all'
                                                    _hover={{ bgColor: 'green.200' }}
                                                    onClick={() => {
                                                        // setScope(item)
                                                        // onOpen()
                                                    }}
                                                >Edit <Box ml={1} as={FiEdit} /></Flex>
                                                <Flex 
                                                    p={1} h={6}
                                                    borderWidth='1px'
                                                    borderStyle='solid'
                                                    borderColor='gray.600'
                                                    cursor='pointer'
                                                    alignItems='center'
                                                    direction='row'
                                                    fontSize={12}
                                                    transition='0.3s ease all'
                                                    _hover={{ bgColor: 'orange.200' }}
                                                    onClick={() => {
                                                        setScope(item)
                                                        onOpen()
                                                    }}
                                                >Mark Inactive <Box ml={1} as={FiSlash} /></Flex>
                                            </Flex>
                                        </Flex>
                                        <Divider />
                                    </ListItem>
                                )
                            })}
                        </List>

                        <ModalPopup modalProps={modalProps} isOpen={isOpen} onClose={onClose} />
                    </Box>
                </Box>
            </BlockContainer>
        </MainLayout>
    )
}

export default ManageProductsPage