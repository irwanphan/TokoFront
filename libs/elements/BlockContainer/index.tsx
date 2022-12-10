import { Box, FlexProps, Text } from "@chakra-ui/react"
import NextLink from 'next/link'

interface BlockContainerLinkProps extends BlockContainerProps {
    href: string
    title?: string
    description?: string
}
interface BlockContainerProps extends FlexProps {
    bgColor?: string
}

const BlockContainer = ({ bgColor, children, ...rest }:BlockContainerProps) => {
    return (
        <Box
            bgColor='black'
            paddingTop='1px'
            paddingLeft='1px'
            paddingRight='3px'
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

export const BlockContainerLink = ({ href, title, description, bgColor }:BlockContainerLinkProps) => {
    return (
        <NextLink href={href}>
            {/* TODO: retrieve image here */}
            <BlockContainer bgColor={bgColor}>
                <Text fontSize={16} fontWeight={600}>
                    {title}
                </Text>
                <Text fontSize={12} mt={1} color='blackAlpha.800'>
                    {description}
                </Text>
            </BlockContainer>
        </NextLink>
    )
}

export default BlockContainer