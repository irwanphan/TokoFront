import { useState } from "react"
import BlockContainer from "@elements/BlockContainer"
import FormInput from "@elements/FormInput"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import LoadingOverlay from "@elements/LoadingOverlay"
import { Box, Flex, useToast, Img, Text, Divider, useDisclosure } from "@chakra-ui/react"
import { FiBox, FiPackage, FiShoppingCart } from "react-icons/fi"
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const handleAddProduct = () => {
        console.log(store)
        onOpen()
    }
    const modalProps = {
        title: `Add Product`,
    }
    const handlePickProduct = (item:ItemInterface) => {
        console.log(item)
        onClose()
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
                    onClick={() => handleAddProduct()}
                >
                    Add
                </FormSubmitButton>
                <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                    <CartItems />
                </Box>
            </BlockContainer>

            { isLoading && <LoadingOverlay isLoading={isLoading} /> }
            <ModalPopup modalProps={modalProps} isOpen={isOpen} onClose={onClose} canCancel>
                <Flex gap={2} flexDirection='column'>
                    {
                        store.map((item:ItemInterface) => {
                            return (
                                <Box
                                    border='1px solid lightgray'
                                    borderRadius={4}
                                    padding={2}
                                    cursor='pointer'
                                    onClick={() => handlePickProduct(item)}
                                >
                                    <Flex key={item.id} gap={2}>
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