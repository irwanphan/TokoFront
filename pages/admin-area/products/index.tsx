import { Box, Flex, Divider, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "@libs/components/Cart"
import MainLayout from "@libs/layouts/MainLayout"
import { FiPackage } from "react-icons/fi"

const ManageProductsPage = () => {
    return (
        <MainLayout>
            <BlockContainer>
                <Box>
                    <Flex alignItems='center'>
                        <Box as={FiPackage} mr={2} />
                        <Text fontWeight={600} >Product List</Text>
                    </Flex>
                </Box>
                <Divider />
                <FormSubmitButton href="/admin-area/products/create" buttonColor="green.100" >+ New</FormSubmitButton>
                <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                    <CartItems />
                </Box>
            </BlockContainer>
        </MainLayout>
    )
}

export default ManageProductsPage