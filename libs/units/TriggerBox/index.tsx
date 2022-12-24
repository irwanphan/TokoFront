import { Box, Flex, FlexProps } from "@chakra-ui/react"
import { IconType } from "react-icons/lib"

interface TriggerBoxProps extends FlexProps {
    icon?: IconType
    hoverColor?: string
}

const TriggerBox = ({icon, children, hoverColor, ...rest}: TriggerBoxProps) => {
    return (
        <Flex 
            p={1} h={6}
            borderWidth='1px'
            borderStyle='solid'
            borderColor='gray.600'
            cursor='pointer'
            alignItems='center'
            direction='row'
            fontSize={12}
            transition='0.3s ease all'
            _hover={
                hoverColor  ? { bgColor: hoverColor }
                            : { bgColor: 'green.200' }
            }
            {...rest}
        >
            {children}
            {
                icon &&
                <Box ml={1} as={icon} />
            }
        </Flex>
    )
}

export default TriggerBox