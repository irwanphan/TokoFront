import { Box, FlexProps } from "@chakra-ui/react"

interface BlockContainerProps extends FlexProps {
    bgColor?: string
}

const BlockContainer = ({ bgColor, children, ...rest }:BlockContainerProps) => {
    return (
        <Box
            bgColor='black'
            paddingTop='1px'
            paddingLeft='1px'
            paddingRight='2px'
            paddingBottom='4px'
        >
            <Box
                p='2rem'
                bgColor={bgColor ?? 'white'}
                {...rest}
            >
                {children}
            </Box>
        </Box>
    )
}
export default BlockContainer