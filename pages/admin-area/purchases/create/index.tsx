import { useState } from "react"
import BlockContainer from "@elements/BlockContainer"
import FormInput from "@elements/FormInput"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import LoadingOverlay from "@elements/LoadingOverlay"
import { Box, Flex, useToast, Img, Text, Divider, useDisclosure, NumberInput, Input, NumberInputField, List, ListItem } from "@chakra-ui/react"
import { FiBox, FiPackage, FiShoppingCart, FiTrash, FiX } from "react-icons/fi"
import { useRecoilValue } from "recoil"
import { ItemInterface } from "@interfaces//storeItem"
import { productsState } from "@contexts/products"
import LoadingBlock from "@elements/LoadingBlock"
import { CartItems } from "@components/Cart"
import ModalPopup from "@units/ModalPopup"

interface IFormInput {
    name: string
    refId: string
    description: string
    price: number | any
    currentStock?: number
}

const CreateProductPage = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setDisabled ] = useState(false)

    const store = useRecoilValue<ItemInterface[]>(productsState)
    // console.log(store)
    const [ isLoadingProducts, setIsLoadingProducts ] = useState<boolean>(true)

    const [ productsPicked, setProductsPicked ] = useState<ItemInterface[]>([])

    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            name: '',
            refId: '',
            description: '',
            price: 0,
            currentStock: 0
        }
    })

    // handling add product modal
    const { isOpen: isOpenAddItem, onOpen: onOpenAddItem, onClose: onCloseAddItem } = useDisclosure()
    const { isOpen: ItemeleteProduct, onOpen: onOpenDeleteItem, onClose: onCloseDeleteItem } = useDisclosure()
    
    const handleAddItem = () => {
        console.log(store)
        onOpenAddItem()
    }
    const modalPropsForAddItem = {
        title: `Add Product`,
    }
    const handlePickItem = (item:ItemInterface) => {
        setProductsPicked([...productsPicked, item])
        onCloseAddItem()
    }

    const toast = useToast()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        data.price = parseInt(data.price) // price was string
        setIsLoading(true)
        toast({title:'Saving...'})
        // 
        setIsLoading(false)
        setDisabled
        toast({title:'Saved', status:'success'})
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
            <BlockContainer>
                <Flex alignItems='center'>
                    <Box as={FiBox} mr={2} />
                    <Text fontWeight={600} >Purchasing</Text>
                </Flex>
                <Divider />
                <FormSubmitButton notLink buttonColor="green.100"
                    onClick={() => handleAddItem()}>
                    Add
                </FormSubmitButton>
                <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                    <List gap={2}>
                    {   productsPicked.length > 0 ?
                        productsPicked.map((item:ItemInterface) => {
                            return (
                                <ListItem key={item.id}>
                                    <Flex alignItems='center' gap={2}>
                                        <Box w={20} h={10} overflow='hidden'>
                                            <Img src={item.image} />
                                        </Box>
                                        <Flex alignItems='center' mb={1}>
                                            <Text>{item.name}</Text>
                                            <Box 
                                                ml={2} p={1} 
                                                borderWidth='1px'
                                                borderStyle='solid'
                                                borderColor='gray.600'
                                                cursor='pointer'
                                                fontSize={12}
                                                transition='0.3s ease all'
                                                _hover={{ bgColor: 'orange.200' }}
                                                onClick={() => {
                                                    // setScope(cartItem)
                                                    onOpenDeleteItem()
                                                }}
                                            ><FiTrash /></Box>
                                        </Flex>
                                    </Flex>
                                    <Flex color='gray.600' fontSize={12} my={2} justifyContent='space-between'>
                                        <Flex gap={2} alignItems='center'>
                                            <Flex gap={1.5} alignItems='center'>
                                                Qty: 
                                                <NumberInput defaultValue={1} min={1}>
                                                    <NumberInputField fontSize={12} h={6} w={20} p={2} />
                                                </NumberInput>
                                            </Flex>
                                            <FiX />
                                            <Flex gap={1.5} alignItems='center'>
                                                <Input placeholder='price' 
                                                    fontSize={12} h={6} w={20} p={2} 
                                                    value={item.lastPurchasePrice ? item.lastPurchasePrice : 0}
                                                />
                                            </Flex>
                                        </Flex>
                                        <Box justifySelf='flex-end' >asdf</Box>
                                    </Flex>
                                    <Divider />
                                </ListItem>
                            )
                        }) : <>Add to your purchase / procurement</>
                    }
                    </List>
                </Box>
            </BlockContainer>

            { isLoading && <LoadingOverlay isLoading={isLoading} /> }
            <ModalPopup modalProps={modalPropsForAddItem} isOpen={isOpenAddItem} onClose={onCloseAddItem} canCancel>
                <Flex gap={2} flexDirection='column'>
                    {
                        store.map((item:ItemInterface) => {
                            return (
                                <Box
                                    border='1px solid lightgray'
                                    borderRadius={4}
                                    padding={2}
                                    cursor='pointer'
                                    transition='0.3s ease all'
                                    _hover={{ bgColor: 'gray.100' }}
                                    onClick={() => handlePickItem(item)}
                                >
                                    <Flex key={item.id} alignItems='center' gap={2}>
                                        <Box w={20} h={10} overflow='hidden'>
                                            <Img src={item.image} />
                                        </Box>
                                        <Text>{item.name}</Text>
                                    </Flex>
                                </Box>
                            )
                        })
                    }
                </Flex>
            </ModalPopup>
            
        </MainLayout>
    )
}

export default CreateProductPage