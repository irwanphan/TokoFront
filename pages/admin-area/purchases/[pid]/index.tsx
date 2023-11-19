import { Box, Divider, Flex, Skeleton, useToast, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import LoadingBlock from "@elements/LoadingBlock"
import MainLayout from "@layouts//MainLayout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiFileText } from "react-icons/fi"
import axios from "axios"
import LoadingOverlay from "@elements/LoadingOverlay"
import { PurchaseInterface } from "@interfaces//purchases"
import { useFetchPurchaseById } from "@hooks/useFetchPurchaseById"

const PurchaseDetailViewPage = () => {
    const [ userCategory, setUserCategory ] = useState('admin')

    // handling show item
    const [ selected, setSelected ] = useState<PurchaseInterface>()
    const [ qid, setQid ] = useState<number|any>()

    const router = useRouter()
    const { pid }:any = router.query
    const [ isLoadingId, setIsLoadingId ] = useState<boolean>(true)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setDisabled ] = useState(false)

    const toast = useToast()

    useEffect(() => {
        pid === undefined   ? console.log('waiting ...')
                            : setQid(pid)
        setIsLoadingId(false)
    }, [pid] )
    const { purchase, isLoadingPurchase } = useFetchPurchaseById(qid)

    useEffect(() => {
        if (purchase) setSelected(purchase)
    }, [purchase])
    // console.log(selected)
    
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
            <Skeleton h={12} mb={4} />
            <LoadingBlock />
        </MainLayout>
    )

    return (
        <MainLayout>
            <Flex gap={2}>
                <FormSubmitButton href="/admin-area">Dashboard</FormSubmitButton>
            </Flex>
            <Box mt={4} />

            <BlockContainer>
                {
                    purchase &&
                    <Box>
                        <Box>
                            <Flex alignItems='center'>
                                <Box as={FiFileText} mr={2} />
                                <Text fontWeight={600} >Invoice #: {purchase.id}</Text>
                            </Flex>
                            <Divider/>
                        </Box>

                        <Text>Purchased on : {purchase.createdAt.toString()}</Text>
                        { purchase.detail.map(item => {
                            return (
                                <Box key={item.id}
                                    border="1px solid lightgray"
                                    borderRadius={8}
                                    p={2} my={2}
                                >
                                    <Text>product ID: {item.productId}</Text>
                                    <Text>product price: {item.purchasePrice}</Text>
                                    <Text>qty bought: {item.qty} {item.unit}</Text>
                                </Box>
                            )
                        }) }

                        <Text>Total : {purchase.total}</Text>

                        {
                            purchase.note &&
                            <Text fontSize={12} mt={2}>
                                Note : {purchase.note}
                            </Text>
                        }
                    </Box>
                }
                    
                <Divider mt={8} mb={4} />

                {/* TODO: mark delivered here is by admin only */}

                <Flex gap={2} justifyContent='flex-end'>
                    <FormSubmitButton href="/admin-area/purchases" >Back</FormSubmitButton>
                    <FormSubmitButton notLink 
                        buttonColor="green.100"
                        isDisabled={isDisabled}
                        // onClick={handleSubmit(onSubmit)} 
                        >
                        Delivered!
                    </FormSubmitButton>
                </Flex>

            </BlockContainer>

            { isLoading && <LoadingOverlay isLoading={isLoading} /> }
        </MainLayout>
    )
}

export default PurchaseDetailViewPage