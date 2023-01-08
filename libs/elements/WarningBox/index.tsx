import { Box, FlexProps } from "@chakra-ui/react"

const WarningBox = ({children, ...rest}: FlexProps) => {
    return (
        <Box bgColor='red.600'
            border='1px solid black'
            borderBottomWidth='2px'
            color='white'
            fontSize='0.75rem'
            fontWeight={600}
            px={2} py={1.5} mb={2}
        >
            {children}
        </Box>
    )
}

export default WarningBox