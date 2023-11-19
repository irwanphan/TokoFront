import { Box, Flex, Divider, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import LoadingBlock from "@elements/LoadingBlock"
import { useFetchPurchases } from "@hooks/useFetchPurchases"
import { PurchaseInterface } from "@interfaces//purchases"
import MainLayout from "@layouts//MainLayout"
import { FiBookOpen, FiFileText } from "react-icons/fi"


const PurchasesPage = () => {
    const { purchases, isLoadingPurchases } = useFetchPurchases()
    // console.log(purchases)

    if (isLoadingPurchases) {
        return (
            <MainLayout>
                <LoadingBlock />
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
                        <Box as={FiBookOpen} mr={2} />
                        <Text fontWeight={600} >Purchases List</Text>
                    </Flex>
                </Box>
                <Divider />
                {
                    purchases &&
                    purchases.map((purchase:PurchaseInterface) => {
                        return (
                            <Box key={purchase.id}
                                border="1px solid lightgray"
                                borderRadius={8}
                                p={4}
                                my={4}
                            >
                                <Flex alignItems='center'>
                                    <Box as={FiFileText} mr={2} />
                                    <Text fontWeight={600} >Invoice #: {purchase?.id}</Text>
                                </Flex>
                                <Divider/>
                                    
                                <Text>
                                    Purchased on : {purchase?.createdAt}
                                </Text>
                                {/* { purchase?.detail.map(item => {
                                    return (
                                        <Box key={item.id}
                                            border="1px solid lightgray"
                                            borderRadius={8}
                                            p={2}
                                            my={2}
                                        >
                                            <Text>
                                                product ID: {item.productId}
                                            </Text>
                                            <Text>
                                                product price: {item.purchasePrice}
                                            </Text>
                                            <Text>
                                                qty bought: {item.qty} {item.unit}
                                            </Text>
                                        </Box>
                                    )
                                }) } */}
                                <Text>
                                    Total : {purchase?.total}
                                </Text>

                                {
                                    purchase?.note &&
                                    <Text fontSize={12} mt={2}>
                                        Note : {purchase?.note}
                                    </Text>
                                }
                            </Box>
                        )
                    })
                }
                
            </BlockContainer>
        </MainLayout>
    )
}

export default PurchasesPage