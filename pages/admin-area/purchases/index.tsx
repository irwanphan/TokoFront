import { Box, Flex, Divider, Text } from "@chakra-ui/react"
import { useAuth } from "@contexts/authContext"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import LoadingBlock from "@elements/LoadingBlock"
import { PurchaseInterface } from "@interfaces//purchases"
import MainLayout from "@layouts//MainLayout"
import axios from "axios"
import { useEffect, useState } from "react"
import { FiBookOpen, FiBox, FiFileText } from "react-icons/fi"

const PurchasesPage = () => {
    const { user } = useAuth()
    const [ isLoadingId, setIsLoadingId ] = useState<boolean>(true)
    const [ qid, setQid ] = useState<string>()
    const [ purchases, setPurchases ] = useState<PurchaseInterface[]>()
    const [ isLoadingPurchases, setIsLoadingPurchases ] = useState<boolean>(true)
    useEffect(() => {
        if (user) setQid(user.id)
    }, [user] )
    useEffect(() => {
        if (qid) setIsLoadingId(false)
    }, [qid] )
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/purchases/get-all-by-user-id/?userId=${qid}`)
                setPurchases(response)
                // console.log ('response: ', response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingPurchases(false)
        }
        fetchData()
    }, [isLoadingId, qid])
    console.log(purchases)

    return (<MainLayout />)

    // if (isLoadingPurchases) {
    //     return (
    //         <MainLayout>
    //             <LoadingBlock />
    //         </MainLayout>
    //     )
    // }

    // return (
    //     <MainLayout>
    //         <Flex gap={2}>
    //             <FormSubmitButton href="/admin-area">Dashboard</FormSubmitButton>
    //             <FormSubmitButton href="/admin-area/purchases/create" buttonColor="green.100" ><Box as={FiBox} mr={0.5}/>Purchase</FormSubmitButton>
    //         </Flex>
    //         <Box mt={4} />

    //         <BlockContainer>
    //             <Box>
    //                 <Flex alignItems='center'>
    //                     <Box as={FiBookOpen} mr={2} />
    //                     <Text fontWeight={600} >Purchases List</Text>
    //                 </Flex>
    //             </Box>
    //             <Divider />
    //             {
    //                 purchases &&
    //                 purchases.map((purchase:PurchaseInterface) => {
    //                     return (
    //                         <Box key={purchase.id}
    //                             border="1px solid lightgray"
    //                             borderRadius={8}
    //                             p={4} my={4}
    //                         >
    //                             <Flex alignItems='center'>
    //                                 <Box as={FiFileText} mr={2} />
    //                                 <Text fontWeight={600} >Invoice #: {purchase.id}</Text>
    //                             </Flex>
    //                             <Divider/>
                                    
    //                             <Text>Purchased on : {purchase.createdAt.toString()}</Text>
    //                             {/* { purchase?.detail.map(item => {
    //                                 return (
    //                                     <Box key={item.id}
    //                                         border="1px solid lightgray"
    //                                         borderRadius={8}
    //                                         p={2}
    //                                         my={2}
    //                                     >
    //                                         <Text>
    //                                             product ID: {item.productId}
    //                                         </Text>
    //                                         <Text>
    //                                             product price: {item.purchasePrice}
    //                                         </Text>
    //                                         <Text>
    //                                             qty bought: {item.qty} {item.unit}
    //                                         </Text>
    //                                     </Box>
    //                                 )
    //                             }) } */}
    //                             <Text>Total : {purchase.total}</Text>

    //                             {
    //                                 purchase.note &&
    //                                 <Text fontSize={12} mt={2}>
    //                                     Note : {purchase.note}
    //                                 </Text>
    //                             }
    //                         </Box>
    //                     )
    //                 })
    //             }
                
    //         </BlockContainer>
    //     </MainLayout>
    // )
}

export default PurchasesPage