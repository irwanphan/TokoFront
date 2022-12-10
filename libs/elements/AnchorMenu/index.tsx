import { Box, FlexProps, Link, Tooltip } from "@chakra-ui/react"

interface AnchorMenuProps extends FlexProps {
    href: string
    tooltip?: string
}

export const AnchorMenuText = ({href, tooltip, children, ...rest}: AnchorMenuProps) => {
    return (
        <Link
            href={href}>
            {children}
        </Link>
    )
}

const AnchorMenuIcon
 = ({href, tooltip, children, ...rest}: AnchorMenuProps) => {
    if (!tooltip) {
        return (
            <Box
                {...rest}
            >
                <Link 
                    display='block' p={2}
                    fontSize={24}
                    transition='.4s ease all'
                    borderWidth='1px 2px 3px 1px'
                    borderStyle='solid'
                    borderColor='transparent'
                    _hover= {{ 
                        borderColor: 'gray.800',
                        shadow: 'lg',
                        borderRadius: 'lg'
                    }}
                    href={href}>
                    {children}
                </Link>
            </Box>
        )
    }
    
    return (
        <Tooltip hasArrow label={tooltip} bgColor='gray.800' borderRadius='xl' px={3} py={2}>
            <Link 
                display='block' p={2}
                fontSize={24}
                transition='.4s ease all'
                borderWidth='1px 2px 3px 1px'
                borderStyle='solid'
                borderColor='transparent'
                _hover= {{ 
                    borderColor: 'gray.800',
                    shadow: 'lg',
                    borderRadius: 'lg'
                }}
                href={href}>
                {children}
            </Link>
        </Tooltip>
    )
}

export default AnchorMenuIcon
