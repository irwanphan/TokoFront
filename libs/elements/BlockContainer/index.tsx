import { Box, FlexProps, Img, Text } from "@chakra-ui/react"
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
            src={product.image}
            alt={product.name ?? "An image of something"}
        />
        <Text fontSize={16} fontWeight={600} mt={3}>
            {product.name}
        </Text>
        <Text fontSize={12} mt={1} color='blackAlpha.800'>
            {product.description}
        </Text>
    </>
)

export const BlockContainerLink = ({ href, product, title, description, bgColor }:BlockContainerLinkProps) => {
    return (
        <NextLink href={href}>
            {/* TODO: retrieve image here */}
                {
                    product ?
                    <BlockContainer bgColor={bgColor}>
                        <ProductBlock product={product} />
                    </BlockContainer>
                    :
                    <BlockContainer bgColor={bgColor}>
                        <TitleAndDescription title={title} description={description} />
                    </BlockContainer>
                }
        </NextLink>
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