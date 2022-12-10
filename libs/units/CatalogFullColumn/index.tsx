import { Box, Button, FlexProps, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

interface CatalogColumnProps extends FlexProps {
    title: string
    price: number
    currency: string
    href: string
    color?: string
    borderColor?: string
    bgColor?: string
}

const CatalogFullColumn = ( {title, price, currency, href, color, borderColor, bgColor, children, ...rest}: CatalogColumnProps ) => {
    return (
        <Box
            p='2rem'
            {...rest}
        >
            {/* <Stack> */}
                <Text>{title}</Text>
                <Text>{currency} {price}</Text>
                {children}
                <NextLink href={href} passHref>
                    <Button
                        py={2} px={6}
                        borderRadius={0}
                        borderTopWidth='1px'
                        borderLeftWidth='1px'
                        borderRightWidth='2px'
                        borderBottomWidth='3px'
                        borderStyle='solid'
                        color={color ?? 'black'}
                        borderColor={borderColor ?? 'black'}
                        bgColor={bgColor ?? 'transparent'}
                        width='max-content'
                    >
                        View
                    </Button>
                </NextLink>
            {/* </Stack> */}
        </Box>
    )
}

export default CatalogFullColumn