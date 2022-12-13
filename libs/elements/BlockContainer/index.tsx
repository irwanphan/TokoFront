import { Box, FlexProps, Img, Text } from "@chakra-ui/react"
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
            borderTopRightRadius='3px'
            borderBottomLeftRadius='4px'
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

export const BlockImage = () => {
    return (
        <BlockContainer>
            <Img 
                src="https://static.wixstatic.com/media/d51f38_06581f8dd35f412a90b2d4a33054880c~mv2.png/v1/fill/w_688,h_479,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BIG-NIGHT-IN-V2.png"
            />
        </BlockContainer>
    )
}

export default BlockContainer