import { Box, Divider, Flex, Grid, Skeleton, useToast, Text } from "@chakra-ui/react"
import { productsState } from "@contexts/products"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import LoadingBlock from "@elements/LoadingBlock"
import { ItemInterface } from "@interfaces//storeItem"
import MainLayout from "@layouts//MainLayout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiFileText } from "react-icons/fi"
import { useRecoilState } from "recoil"
import axios from "axios"
import LoadingOverlay from "@elements/LoadingOverlay"
import { useFetchPurchase, useFetchPurchases } from "@hooks/useFetchPurchases"
import { PurchasesInterface } from "@interfaces//purchases"

const ProductDetailViewPage = () => {
    const [ userCategory, setUserCategory ] = useState('admin')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setDisabled ] = useState(false)
    const [ selected, setSelected ] = useState<ItemInterface>()

    const [ purchase, setPurchase ] = useState<PurchasesInterface>()
    const [ isLoadingPurchase, setIsLoadingPurchase ] = useState<boolean>(true)
    
    const router = useRouter()
    const { pid }:any = router.query
    // handling ShowItem
    const [ qid, setQid ] = useState<number|any>()
    
    const toast = useToast()

    useEffect(() => {
        console.log('pid:', pid)
        if ( typeof pid === 'string' ) {
            setQid(parseInt(pid))
            console.log('qid :', qid)
        }
    }, [pid] )
    useEffect(() => {
        if (qid) {
            console.log('qid ready :', qid)
            const fetchData = async () => {
                try {
                    const { data: response } = await axios.get(`/api/purchases/?id=${qid}`)
                    console.log(response)
                    setPurchase(response)
                } catch (error) {
                    console.log(error)
                }
                setIsLoadingPurchase(false)
            }
            fetchData()
        }
    }, [qid] )
    useEffect(() => {
        // console.log(selected)
        // setIsLoadingPurchase(false)
    }, [selected])
    
    const onSubmit = async (data:any) => {
        data.price = parseInt(data.price) // price was string
        setIsLoading(true)
        toast({title:'Saving...'})
        // await doSomething(data)
        setIsLoading(false)
        setDisabled
        toast({title:'Saved', status:'success'})
    }


    if (isLoadingPurchase) return (
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
            <Flex gap={2}>
                <FormSubmitButton href="/admin-area">Dashboard</FormSubmitButton>
            </Flex>
            <Box mt={4} />

            <BlockContainer>
                <Box>
                    <Flex alignItems='center'>
                        <Box as={FiFileText} mr={2} />
                        <Text fontWeight={600} >Invoice #: TODO invoice code</Text>
                    </Flex>
                    <Divider/>
                </Box>
                <Box>
                        
                    TODO: show data here

                    <Divider mt={8} mb={4} />

                    TODO: mark delivered here is by admin only

                    <Flex gap={2} justifyContent='flex-end'>
                        <FormSubmitButton href="/admin-area/products" >Back</FormSubmitButton>
                        <FormSubmitButton notLink 
                            buttonColor="green.100"
                            isDisabled={isDisabled}
                            // onClick={handleSubmit(onSubmit)} 
                            >
                            Delivered!
                        </FormSubmitButton>
                    </Flex>
                </Box>
            </BlockContainer>

            { isLoading && <LoadingOverlay isLoading={isLoading} /> }
        </MainLayout>
    )
}

export default ProductDetailViewPage