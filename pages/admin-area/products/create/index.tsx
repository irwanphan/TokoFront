import { useRef, useState } from "react"
import BlockContainer from "@elements/BlockContainer"
import FormInput from "@elements/FormInput"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import LoadingOverlay from "@elements/LoadingOverlay"
import { useToast } from "@chakra-ui/react"

interface IFormInput {
    name: string
    refId: string
    description: string
    price: number | any
}

const CreateProductPage = () => {
    const [ isLoading, setIsLoading ] = useState(false)

    const { control, handleSubmit, register } = useForm({
        defaultValues: {
          name: '',
          refId: '',
          description: '',
          price: 0
        }
    })

    const createProduct = (data:any) => axios.post('/api/products', data);
    const toast = useToast()
    const toastRef = useRef()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        data.price = parseInt(data.price) // price was string
        setIsLoading(true)
        toast({title:'Saving...'})
        await createProduct(data)
        setIsLoading(false)
        toast({title:'Saved', status:'success'})
    }

    return (
        <MainLayout>
            <BlockContainer>
                <form>
                    <FormInput 
                        name='name'
                        label='Product name' 
                        placeholder="eg. X-Branded Chocolate Variant 120g"
                        register={register} />
                    <FormInput 
                        name='refId' 
                        label='Reference product id' 
                        placeholder='eg. SKU-123' 
                        register={register} />
                    <FormInput 
                        name='description' 
                        label='Product description'
                        type="textarea"
                        placeholder="eg. this product do bang bang"
                        register={register} />
                    <FormInput
                        name='price'
                        label='Product price (IDR)'
                        type='number'
                        placeholder="eg. 50000"
                        register={register} />

                    <FormSubmitButton notLink onClick={handleSubmit(onSubmit)} >
                        Save
                    </FormSubmitButton>
                </form>
            </BlockContainer>

            { isLoading && <LoadingOverlay isLoading={isLoading} /> }
            
        </MainLayout>
    )
}

export default CreateProductPage