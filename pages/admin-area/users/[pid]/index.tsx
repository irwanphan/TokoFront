import { Box, Divider, Flex, Grid, Skeleton, useToast, Text } from "@chakra-ui/react"
import { productsState } from "@contexts/products"
import BlockContainer from "@elements/BlockContainer"
import FormInput from "@elements/FormInput"
import FormSubmitButton from "@elements/FormSubmit"
import LoadingBlock from "@elements/LoadingBlock"
import { ItemInterface } from "@interfaces//storeItem"
import MainLayout from "@layouts//MainLayout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { useForm, SubmitHandler } from "react-hook-form"
import { useFetchUserById } from "@hooks/useFetchUserById"
import { UserInterface } from "@interfaces//users"

const ProductDetailViewPage = () => {
    const [ userCategory, setUserCategory ] = useState('admin')

    // handling ShowItem
    const [ selected, setSelected ] = useState<UserInterface>()
    const [ qid, setQid ] = useState<number|any>()

    const router = useRouter()
    const { pid }:any = router.query
    const [ isLoadingId, setIsLoadingId ] = useState(true)
    
    useEffect(() => {
        setQid(pid)
        setIsLoadingId(false)
    }, [pid] )

    const { user, isLoadingUser } = useFetchUserById(qid)
    
    useEffect(() => {
        if (user) setSelected(user)
    }, [user])

    const { control, handleSubmit, register, setValue } = useForm()

    
    const toast = useToast()

    // const createProduct = (data:any) => axios.post('/api/products', data);
    // const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    //     data.price = parseInt(data.price) // price was string
    //     setIsLoading(true)
    //     toast({title:'Saving...'})
    //     await createProduct(data)
    //     setIsLoading(false)
    //     setDisabled
    //     toast({title:'Saved', status:'success'})
    // }


    // if (isLoadingUser) return (
    //     <MainLayout>
    //         <Grid templateColumns={{base: '1fr', md: '1fr 1fr'}} gap={4}>
    //             <LoadingBlock />
    //             <Box>
    //                 <Skeleton h={12} mb={4} />
    //                 <Skeleton h={6} mb={2} />
    //                 <Skeleton h={4} mb={6} />
    //                 <Skeleton h={8} w={40} />
    //             </Box>
    //         </Grid>
    //     </MainLayout>
    // )

    return (
        <MainLayout>
            {
                userCategory === 'admin' &&
                <Flex gap={2}>
                    <FormSubmitButton href="/admin-area/users">Manage Users</FormSubmitButton>
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
                    {/* <Box>
                        <FormInput 
                            name='name'
                            label='Product name' 
                            placeholder="eg. X-Branded Chocolate Variant 120g"
                            // defaultValue={selected?.name}
                            // isDisabled={isDisabled}
                            register={register} />
                        <FormInput 
                            name='refId' 
                            label='Reference product id' 
                            // defaultValue={selected?.refId}
                            placeholder='eg. SKU-123' 
                            // isDisabled={isDisabled}
                            register={register} />
                        <FormInput 
                            name='description' 
                            label='Product description'
                            type="textarea"
                            // defaultValue={selected?.description}
                            placeholder="eg. this product do bang bang"
                            // isDisabled={isDisabled}
                            register={register} />
                        <FormInput
                            name='price'
                            label='Product price (IDR)'
                            type='number'
                            // defaultValue={selected?.price}
                            placeholder="eg. 50000"
                            // isDisabled={isDisabled}
                            register={register} />
                        <FormInput
                            name='currentStock'
                            label='Current Stock (piece)'
                            type='number'
                            // defaultValue={selected?.currentStock}
                            placeholder="eg. 50"
                            // isDisabled={isDisabled}
                            register={register} />
                    </Box> */}

                    <Divider mt={8} mb={4} />

                    <Flex gap={2} justifyContent='flex-end'>
                        <FormSubmitButton href="/admin-area/products" >Back</FormSubmitButton>
                        <FormSubmitButton notLink 
                            buttonColor="green.100"
                            // isDisabled={isDisabled}
                            // onClick={handleSubmit(onSubmit)} 
                            >
                            Save
                        </FormSubmitButton>
                    </Flex>
                </form>
            </BlockContainer>

            {/* { isLoading && <LoadingOverlay isLoading={isLoading} /> } */}
        </MainLayout>
    )
}

export default ProductDetailViewPage