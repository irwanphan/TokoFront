import { Box, FlexProps } from "@chakra-ui/react"
import IconicTitle from "@elements/IconicTitle"
import { IconType } from "react-icons"

interface BubbleContainerProps extends FlexProps {
    title?: string
    icon?: IconType | undefined
    hoverColor?: string
}

const BubbleContainer = ({title, icon, hoverColor, children, ...rest}: BubbleContainerProps) => {
    return (
        <Box
            borderRadius='1rem'
            borderStyle='solid'
            borderColor='gray.800'
            borderWidth='1px 2px 3px 1px'
            bgGradient='linear(to-r, yellow.200, orange.200)'
            role='group'
            transition='.3s ease all'
            p={2}
            _hover={{
                shadow: 'lg'
            }}
            {...rest}
        >
            <Box
                borderRadius='.5rem'
                borderStyle='solid'
                borderTopColor='gray.500'
                borderLeftColor='gray.500'
                borderRightColor='gray.400'
                borderBottomColor='gray.400'
                borderWidth='2px'
                bg='whiteAlpha.900'
                p={6}
            >
                { title && 
                    <IconicTitle 
                        icon={icon} 
                            hoverColor={
                                hoverColor ?? 'yellow.400'
                            }>
                        {title}
                    </IconicTitle>
                }
                {children}
            </Box>
        </Box>
    )
}

export default BubbleContainer