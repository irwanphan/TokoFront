import { Box, Flex, Text } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import { BiRocket } from "react-icons/bi"

const Custom404 = () => {
    return (
        <Box bgGradient='linear(to-b, cyan.600, blue.900)'>
            <Flex direction='row' justifyContent='center' h='100vh'>
                <Flex direction='column' justifyContent='center' alignItems='center' textAlign='center'>
                    <Text fontSize={40} fontWeight={800} mb={4}>You are lost ...</Text>
                    <FormSubmitButton href="/" >
                        <Box as={BiRocket} fontSize={24} mr={2}/>
                        Go Home
                    </FormSubmitButton>
                </Flex>
            </Flex>
        </Box>
    )
}
export default Custom404