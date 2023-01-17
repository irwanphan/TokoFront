import { useState } from "react"
import BlockContainer from "@elements/BlockContainer"
import FormInput from "@elements/FormInput"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import LoadingOverlay from "@elements/LoadingOverlay"
import { Box, Flex, useToast, Text, Divider } from "@chakra-ui/react"
import { FiPackage } from "react-icons/fi"

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

    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            name: '',
            refId: '',
            description: '',
            price: 0,
            currentStock: 0
        }
    })

    const createProduct = (data:any) => axios.post('/api/products', data);
    const toast = useToast()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        data.price = parseInt(data.price) // price was string
        setIsLoading(true)
        toast({title:'Saving...'})
        await createProduct(data)
        setIsLoading(false)
        setDisabled
        toast({title:'Saved', status:'success'})
    }

    return (
        <MainLayout>
            <BlockContainer>
                <Box>
                    <Flex alignItems='center'>
                        <Box as={FiPackage} mr={2} />
                        <Text fontWeight={600} >New Product</Text>
                    </Flex>
                    <Divider/>
                </Box>
                <form>
                    <Box>
                        <FormInput 
                            name='name'
                            label='Product name' 
                            placeholder="eg. X-Branded Chocolate Variant 120g"
                            isDisabled={isDisabled}
                            register={register} />
                        <FormInput 
                            name='refId' 
                            label='Reference product id' 
                            placeholder='eg. SKU-123' 
                            isDisabled={isDisabled}
                            register={register} />
                        <FormInput 
                            name='description' 
                            label='Product description'
                            type="textarea"
                            placeholder="eg. this product do bang bang"
                            isDisabled={isDisabled}
                            register={register} />
                        <FormInput
                            name='price'
                            label='Product price (IDR)'
                            type='number'
                            placeholder="eg. 50000"
                            isDisabled={isDisabled}
                            register={register} />
                        <FormInput
                            name='currentStock'
                            label='Current Stock (piece)'
                            type='number'
                            // defaultValue={selected?.currentStock}
                            placeholder="eg. 50"
                            isDisabled={isDisabled}
                            register={register} />
                    </Box>

                    <Divider mt={8} mb={4} />

                    <Flex gap={2} justifyContent='flex-end'>
                        <FormSubmitButton href="/admin-area/products" >users</FormSubmitButton>
                        <FormSubmitButton notLink 
                            buttonColor="green.100"
                            isDisabled={isDisabled}
                            onClick={handleSubmit(onSubmit)} >
                            Save
                        </FormSubmitButton>
                    </Flex>
                </form>
            </BlockContainer>

            { isLoading && <LoadingOverlay isLoading={isLoading} /> }
            
        </MainLayout>
    )
}

export default CreateProductPage