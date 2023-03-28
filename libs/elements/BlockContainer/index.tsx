import { Box, Circle, Flex, FlexProps, Img, Text } from "@chakra-ui/react"
import { ItemInterface } from "@libs/interfaces/storeItem"
import NextLink from 'next/link'

interface BlockContainerLinkProps extends BlockContainerProps {
    href: string
    title?: string
    description?: string
    product?: ItemInterface
}
interface TitleAndDescriptionProps {
    title?: string
    description?: string
}
interface ProductBlockProps {
    product: ItemInterface
}
interface BlockContainerProps extends FlexProps {
    bgColor?: string
}
interface BlockImageProps extends FlexProps {
    imgUrl?: string
    alt?: string
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
            transition='0.3s ease all'
            _hover={{ shadow: 'lg' }}
        >
            <Box
                p={{base:'1rem', sm:'1.25rem', md:'1.5rem', lg:'2rem'}}
                bgColor={bgColor ?? 'white'}
                {...rest}
            >
                {children}
            </Box>
        </Box>
    )
}

const TitleAndDescription = ({title, description}:TitleAndDescriptionProps ) => (
    <>
        <Text fontSize={16} fontWeight={600}>
            {title}
        </Text>
        <Text fontSize={12} mt={1} color='blackAlpha.800'>
            {description}
        </Text>
    </>
)
const ProductBlock = ({product}: ProductBlockProps ) => (
    <>
        <Img 
            src={product?.image}
            alt={product?.name ?? "An image of something"}
        />
        <Text fontSize={16} fontWeight={600} mt={3}>
            {product?.name ?? ""}
        </Text>
        <Text fontSize={12} mt={1} color='blackAlpha.800'>
            {product?.description}
        </Text>
    </>
)

const ProductBlockSlim = ({product}: ProductBlockProps ) => (
    <Flex gap={2}>
        <Box>
            <Circle size={14} overflow="hidden">
                <Img
                    minW="full" minH="full" w="auto"
                    src={product?.image}
                    alt={product?.name ?? "An image of something"}
                />
            </Circle>
        </Box>
        <Box>
            <Text fontSize={16} mt={0.375} mb={0.25} fontWeight={600} >
                {product?.name ?? ""}
            </Text>
            <Text fontSize={12} color='blackAlpha.800'>
                {product?.description}
            </Text>
        </Box>
    </Flex>
)

export const BlockContainerLink = ({ href, product, title, description, bgColor }:BlockContainerLinkProps) => {
    return (
        <NextLink href={href}>
            {
                product ?
                <BlockContainer bgColor={bgColor}>
                    <ProductBlock product={product} />
                </BlockContainer>
                :
                <BlockContainerTitleDescription href={href} bgColor={bgColor} title={title} description={description} />
            }
        </NextLink>
    )
}

export const BlockContainerSlimLink = ({ href, product, title, description, bgColor }:BlockContainerLinkProps) => {
    return (
        <NextLink href={href}>
            {
                product ?
                <BlockContainer bgColor={bgColor}>
                    <ProductBlockSlim product={product} />
                </BlockContainer>
                :
                <BlockContainerTitleDescription href={href} bgColor={bgColor} title={title} description={description} />
            }
        </NextLink>
    )
}

export const BlockContainerTitleDescription = ({ title, description, bgColor }:BlockContainerLinkProps) => {
    return (
        <BlockContainer bgColor={bgColor}>
            <TitleAndDescription title={title} description={description} />
        </BlockContainer>
    )
}

export const BlockImage = ({imgUrl, alt}: BlockImageProps) => {
    return (
        <BlockContainer>
            <Img 
                src={imgUrl}
                alt={alt ?? "An image of something"}
            />
        </BlockContainer>
    )
}

export default BlockContainer