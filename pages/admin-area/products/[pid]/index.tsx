import { Box, Divider, Flex, Grid, Skeleton, useToast, Text } from "@chakra-ui/react"
import { productsState, loadProducts } from "@contexts/products"
import BlockContainer from "@elements/BlockContainer"
import FormInput from "@elements/FormInput"
import FormSubmitButton from "@elements/FormSubmit"
import LoadingBlock from "@elements/LoadingBlock"
import { ItemInterface } from "@interfaces//storeItem"
import MainLayout from "@layouts//MainLayout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { useRecoilState } from "recoil"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import LoadingOverlay from "@elements/LoadingOverlay"

interface IFormInput {
    name: string
    refId: string | undefined | any
    description: string
    price: number | any
    currentStock?: number | undefined | any
}

const ProductDetailViewPage = () => {
    const [ userCategory, setUserCategory ] = useState('admin')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isLoadingProduct, setIsLoadingProduct ] = useState<boolean>(true)
    const [ isDisabled, setDisabled ] = useState(false)
    
    const router = useRouter()
    const { pid }:any = router.query
    const { control, handleSubmit, register, setValue } = useForm()

    // handling ShowItem
    const [ store, setStore ] = useRecoilState<ItemInterface[]>(productsState)
    const [ selected, setSelected ] = useState<ItemInterface>()
    const [ qid, setQid ] = useState<number|any>()
    
    const toast = useToast()

    useEffect(() => {
        // TODO: API for get single product
        const products = loadProducts()
        .then(res => setStore(res))
        // .then(() => setIsLoadingProducts(false))
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
        setQid(pid)
    }, [pid] )
    useEffect(() => {
        const selectedItem:ItemInterface|undefined = store.find( item => item.id === pid )
        setSelected(selectedItem)
    }, [store] )
    useEffect(() => {
        if (selected) {
            console.log(selected)
            setValue('name', selected.name)
            setValue('refId', selected.refId)
            setValue('description', selected.description)
            setValue('price', selected.price)
            setValue('currentStock', selected.currentStock)
        }
        setIsLoadingProduct(false)
    }, [selected])

    const createProduct = (data:any) => axios.post('/api/products', data);
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        data.price = parseInt(data.price) // price was string
        setIsLoading(true)
        toast({title:'Saving...'})
        await createProduct(data)
        setIsLoading(false)
        setDisabled
        toast({title:'Saved', status:'success'})
    }


    if (isLoadingProduct) return (
        <MainLayout>
            <Grid templateColumns={{base: '1fr', md: '1fr 1fr'}} gap={4}>
                <LoadingBlock />
                <Box>
                    <Skeleton h={12} mb={4} />
                    <Skeleton h={6} mb={2} />
                    <Skeleton h={4} mb={6} />
                    <Skeleton h={8} w={40} />
                </Box>
            </Grid>
        </MainLayout>
    )

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
                <Box>
                    <Flex alignItems='center'>
                        <Box as={FiEdit} mr={2} />
                        <Text fontWeight={600} >Edit: {selected?.name}</Text>
                    </Flex>
                    <Divider/>
                </Box>
                <form>
                    <FormInput 
                        name='name'
                        label='Product name' 
                        placeholder="eg. X-Branded Chocolate Variant 120g"
                        // defaultValue={selected?.name}
                        isDisabled={isDisabled}
                        register={register} />
                    <FormInput 
                        name='refId' 
                        label='Reference product id' 
                        // defaultValue={selected?.refId}
                        placeholder='eg. SKU-123' 
                        isDisabled={isDisabled}
                        register={register} />
                    <FormInput 
                        name='description' 
                        label='Product description'
                        type="textarea"
                        // defaultValue={selected?.description}
                        placeholder="eg. this product do bang bang"
                        isDisabled={isDisabled}
                        register={register} />
                    <FormInput
                        name='price'
                        label='Product price (IDR)'
                        type='number'
                        // defaultValue={selected?.price}
                        placeholder="eg. 50000"
                        isDisabled={isDisabled}
                        register={register} />
                    {/* TODO: import unit */}
                    <FormInput
                        name='currentStock'
                        label='Current Stock (piece)'
                        type='number'
                        // defaultValue={selected?.currentStock}
                        placeholder="eg. 50"
                        isDisabled={isDisabled}
                        register={register} />

                    <Flex gap={2} justifyContent='flex-end'>
                        <FormSubmitButton href="/admin-area/products" >Back</FormSubmitButton>
                        <FormSubmitButton notLink 
                            buttonColor="green.100"
                            isDisabled={isDisabled}
                            // onClick={handleSubmit(onSubmit)} 
                            >
                            Save
                        </FormSubmitButton>
                    </Flex>
                </form>
            </BlockContainer>

            { isLoading && <LoadingOverlay isLoading={isLoading} /> }
        </MainLayout>
    )
}

export default ProductDetailViewPage