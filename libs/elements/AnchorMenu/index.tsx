import { Box, FlexProps, Link, Tooltip, useDisclosure } from "@chakra-ui/react"
import React from "react"

interface AnchorMenuProps extends FlexProps {
    href?: string
    tooltip?: string
    onOpen?: () => void
}

export const AnchorMenuText = ({href, tooltip, children, ...rest}: AnchorMenuProps) => {
    return (
        <Link href={href}>
            <Box
                transition='0.3s ease all'
                bgSize='0% 200%'
                bgGradient= 'linear(to-b, transparent, transparent 50%, gray.700 50%, gray.700)'
                _hover={{bgSize: '100% 198%'}}
                {...rest}
            >
                {children}
            </Box>
        </Link>
    )
}

const IconButton = React.forwardRef(({ children, ...rest }:FlexProps, ref:any) => (
    <Box
        display='block' p={2}
        fontSize={24}
        transition='.4s ease all'
        borderWidth='1px 2px 3px 1px'
        borderStyle='solid'
        borderColor='transparent'
        cursor='pointer'
        _hover= {{ 
            borderColor: 'gray.800',
            shadow: 'lg',
            borderRadius: 'lg',
            bgColor: 'white'
        }}
        ref={ref}
        {...rest}
    >
        {children}
    </Box>
))

export const AnchorMenuIconTrigger = ({tooltip, onOpen, children, ...rest}: AnchorMenuProps) => {
    return (
        <Tooltip hasArrow label={tooltip} bgColor='gray.800' borderRadius='xl' px={3} py={2}>
            <IconButton {...rest}
                onClick={onOpen}
            >
                {children}
            </IconButton>
        </Tooltip>
    )
}

const AnchorMenuIcon = ({href, tooltip, children, ...rest}: AnchorMenuProps) => {
    
    // if (!tooltip) {
    //     return (
    //         <Link 
    //             href={href}>
    //             <IconButton {...rest}>
    //                 {children}
    //             </IconButton>
    //         </Link>
    //     )
    // }
    return (
        <Tooltip hasArrow label={tooltip} bgColor='gray.800' borderRadius='xl' px={3} py={2}>
            <Link 
                href={href}>
                <IconButton {...rest}>
                    {children}
                </IconButton>
            </Link>
        </Tooltip>
    )
}

export default AnchorMenuIcon
