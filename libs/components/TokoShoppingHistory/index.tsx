import { Box, Flex, Divider, List, ListItem, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import { LoadingBlockList } from "@elements/LoadingBlock"
import { useFetchSalesByUserId } from "@hooks/useFetchSalesByUserId"
import TriggerBox from "@units/TriggerBox"
import router from "next/router"
import { FiEdit } from "react-icons/fi"
import { TbFileInvoice } from "react-icons/tb"

interface TokoShoppingHistoryProps {
    userId: string | undefined
}

const TokoShoppingHistory = ({userId}: TokoShoppingHistoryProps) => {
    const { sales, isLoadingSales } = useFetchSalesByUserId(userId)

    return (
        <BlockContainer>
            <Flex alignItems='center'>
                <Box as={TbFileInvoice} mr={2}/>
                <Text fontWeight={600} >Shopping history</Text>
            </Flex>
            <Divider />
                <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                    <List className="sale-items">
                        {   isLoadingSales ?
                            <LoadingBlockList />
                        :   
                            sales?.map((sale) => {
                                const date = new Date(`${sale.createdAt}`).toLocaleDateString('en-EN', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric'
                                })
                                const time = new Date(`${sale.createdAt}`).toLocaleTimeString()
                                
                                return (
                                    <ListItem key={sale.id} 
                                        mb={3} // seen from Divider 
                                    >
                                        <Flex alignItems='center' 
                                            fontSize={14}
                                        >
                                            <Text>{date}</Text>                                            
                                        </Flex>
                                        <Flex
                                            color='gray.600'
                                            fontSize={12}
                                            gap={1}
                                            mb={4} // to Divider
                                            justifyContent='space-between'
                                        >
                                            <Flex direction='column' >
                                                <Flex gap={2}>
                                                    <Text>Type of items</Text>                                            
                                                    <Text fontWeight={600}>{sale?.detail?.length}</Text>                                            
                                                </Flex>
                                                <Flex gap={2}>
                                                    <Text>Total sale</Text>                                            
                                                    <Text fontWeight={600}>{sale.total}</Text>                                            
                                                </Flex>
                                            </Flex>
                                            <Flex gap={2} alignItems='flex-end'>
                                                <TriggerBox
                                                    icon={FiEdit}
                                                    hoverColor='green.100'
                                                    onClick={() => {
                                                        router.replace(`/admin-area/sales/${sale.id}`)
                                                    }}
                                                >View Detail
                                                </TriggerBox>
                                            </Flex>
                                        </Flex>
                                        <Divider />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
            </Box>
        </BlockContainer>
    )
}

export default TokoShoppingHistory