import { Box, Flex, Divider, Text, List, ListItem, useDisclosure, Skeleton } from "@chakra-ui/react"
import { productsState } from "@contexts/products"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { LoadingBlockList } from "@elements/LoadingBlock"
import { ItemInterface } from "@interfaces//storeItem"
import MainLayout from "@libs/layouts/MainLayout"
import ModalPopup from "@units/ModalPopup"
import TriggerBox from "@units/TriggerBox"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiEdit, FiPackage, FiSlash } from "react-icons/fi"
import { useRecoilValue } from "recoil"

const ManageProductsPage = () => {
    // const [ userCategory, setUserCategory ] = useState('admin')
    const store = useRecoilValue<ItemInterface[]>(productsState)
    const [ isLoadingProducts, setIsLoadingProducts ] = useState<boolean>(true)
    const router = useRouter()

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

    useEffect(() => {
        setIsLoadingProducts(false)
    }, [store])

    return (
        <MainLayout>
            <Flex gap={2}>
                <FormSubmitButton href="/admin-area">Dashboard</FormSubmitButton>
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
                {
                    isLoadingProducts ?
                    <LoadingBlockList />
                :   <>
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
                                                    <Flex gap={2} alignItems='flex-end'>
                                                        <TriggerBox
                                                            icon={FiEdit}
                                                            hoverColor='green.100'
                                                            onClick={() => {
                                                                router.replace(`/admin-area/products/${item.id}`)
                                                            }}
                                                        >Edit
                                                        </TriggerBox>
                                                        <TriggerBox 
                                                            icon={FiSlash}
                                                            hoverColor='orange.100'
                                                            onClick={() => {
                                                                setScope(item)
                                                                onOpen()
                                                            }}
                                                        >Mark Inactive
                                                        </TriggerBox>
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
                    </>
                }
            </BlockContainer>
        </MainLayout>
    )
}

export default ManageProductsPage