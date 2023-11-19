import { Box, Flex, Divider, Text, List, ListItem, useDisclosure, Skeleton, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { LoadingBlockList } from "@elements/LoadingBlock"
import { useFetchWarehouses } from "@hooks/useFetchWarehouses"
import { ItemInterface } from "@interfaces//storeItem"
import { WarehouseInterface } from "@interfaces//warehouses"
import MainLayout from "@libs/layouts/MainLayout"
import ModalPopup from "@units/ModalPopup"
import TriggerBox from "@units/TriggerBox"
import { useEffect, useState } from "react"
import { FiBox, FiEdit, FiPackage, FiSearch, FiSlash } from "react-icons/fi"
import { useRouter } from "next/router"

const ManageProductsPage = () => {
    const { warehouses, isLoadingWarehouses } = useFetchWarehouses()
    const [ showWarehouses, setShowWarehouses ] = useState<WarehouseInterface[]>()
    const router = useRouter()

    // handling delete modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ scope, setScope ] = useState<WarehouseInterface>()
    const modalProps = {
        title: `Mark ${scope?.name} as Inactive`,
        texts: 'Are you really OK with this decision?',
        button: 'OK',
        action: () => {
            // handleMarkInactive(scope)
            onClose()
        }
    }

    // handling search
    const [ search, setSearch ] = useState('')
    const onSubmit = async (keyword:string) => {
        if (warehouses) {
            const warehouseList:WarehouseInterface[]|any = await warehouses.filter((warehouse:WarehouseInterface) => {
                return warehouse.name.toLowerCase().includes(keyword.toLowerCase())
            })
            setShowWarehouses(warehouseList)
        }
    }

    if (isLoadingWarehouses) {
        return (
            <MainLayout>
                <LoadingBlockList />
            </MainLayout>
        )
    }

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
                        <Text fontWeight={600}>Warehouses</Text>
                    </Flex>
                </Box>
                <Divider />
                    <Flex gap={3}>
                        <FormSubmitButton href="/admin-area/warehouses/create" buttonColor="green.100" >+ New</FormSubmitButton>
                    </Flex>
                    <Box mt={4}>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit(search)
                        }}>
                            <InputGroup>
                                <InputRightElement>
                                    <FiSearch />
                                </InputRightElement>
                                <Input onChange={(e) => setSearch(e.target.value)} 
                                    placeholder="Search product"
                                />
                            </InputGroup>
                        </form>
                    </Box>
                {
                    isLoadingWarehouses ?
                    <LoadingBlockList />
                :   <>
                        <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                            <Box>
                                <List className="cart-warehouses">
                                    {   showWarehouses &&
                                        showWarehouses.map((warehouse:WarehouseInterface) => {
                                        return (
                                            <ListItem key={warehouse.id} mb={2} >
                                                <Flex alignItems='center' mb={1}>
                                                    {warehouse?.name}
                                                </Flex>
                                                <Flex
                                                    color='gray.600'
                                                    fontSize={12}
                                                    gap={1}
                                                    justifyContent='space-between'
                                                >
                                                    <Flex direction='column' >
                                                        <Flex gap={2}>
                                                            <Text>Address</Text>                                            
                                                            <Text fontWeight={600}>{warehouse.address}</Text>                                            
                                                        </Flex>
                                                        <Flex gap={2}>
                                                            <Text>City</Text>                                            
                                                            <Text fontWeight={600}>{warehouse.city}</Text>                                            
                                                        </Flex>
                                                    </Flex>
                                                    <Flex gap={2} alignItems='flex-end'>
                                                        <TriggerBox
                                                            icon={FiEdit}
                                                            hoverColor='green.100'
                                                            onClick={() => {
                                                                router.replace(`/admin-area/warehouses/${warehouse.id}`)
                                                            }}
                                                        >Edit
                                                        </TriggerBox>
                                                        <TriggerBox 
                                                            icon={FiSlash}
                                                            hoverColor='orange.100'
                                                            onClick={() => {
                                                                setScope(warehouse)
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