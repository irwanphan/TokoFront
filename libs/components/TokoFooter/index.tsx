import { Box, Divider } from "@chakra-ui/react"

const TokoFooter = () => {
    return (
        <Box py={8} textAlign='center'>
            <Divider borderColor='black' 
                mb={8}
            />
            <Box fontSize={12}>
                powered by TokoFront&copy;2022
            </Box>
        </Box>

    )
}

export default TokoFooter