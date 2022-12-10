import { HStack, Circle, Text, FlexProps, Box } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { FiBookmark } from "react-icons/fi"

interface IconicTitleProps extends FlexProps {
    icon?: IconType | undefined
    hoverColor: string 
}

const IconicTitle = ({icon, hoverColor, children, ...rest}: IconicTitleProps) => {
    return (
        <Box
            position='absolute'
            top={4}
            role='group'
            {...rest}>
            <HStack>
                <Circle
                    as={icon ?? FiBookmark} 
                    transition='.4s ease all'
                    borderStyle='solid'
                    borderColor='gray.800'
                    borderWidth='1px 2px 3px 1px'
                    size={8} p={1}
                    bg={{ base: `${hoverColor}`, md: 'white' }}
                    position='relative'
                    top={{ base: '-1.5', md: '0' }}
                    _groupHover={{ 
                        bg: `${hoverColor}`,
                        top: '-1.5'
                    }}
                />
                <Text 
                    fontSize={20} fontWeight={700}
                    whiteSpace='nowrap'
                    position='relative' 
                    top={-2}
                    letterSpacing={1}>
                    {children}
                </Text>
            </HStack>
        </Box>
    )
}

export default IconicTitle