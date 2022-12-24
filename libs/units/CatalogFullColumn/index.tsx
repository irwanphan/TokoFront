import { Box, FlexProps, Grid, GridItem, Img, Text } from '@chakra-ui/react'
import BlockContainer from '@elements/BlockContainer'
import FormSubmitButton from '@elements/FormSubmit'
import { ItemInterface } from '@libs/interfaces/storeItem'

interface CatalogColumnProps extends FlexProps {
    product: ItemInterface
    currency?: string
    color?: string
    borderColor?: string
    bgColor?: string
    haveButton?: boolean
    buttonText?: string
    buttonColor?: string
    buttonBorderColor?: string
    buttonTextColor?: string
}

const CatalogFullColumn = ( {product, currency, color, borderColor, bgColor, haveButton, buttonText, buttonColor, buttonBorderColor, buttonTextColor, ...rest}: CatalogColumnProps ) => {
    return (
        <BlockContainer {...rest}>
            <Box bgColor={bgColor}>
                <Grid templateColumns={{base: '1fr', md: '1fr 1fr'}} gap={4}>
                    <GridItem p={8}>
                        <Text  mb={4}
                            fontSize={28} 
                            fontWeight={600}>
                            {product?.name}
                        </Text>
                        <Text mb={4}>{product?.description}</Text>
                        <Text mb={3}>{currency ?? 'IDR'} {product?.price}</Text>
                        {
                            haveButton &&
                            <FormSubmitButton
                                href={`/products/${product?.id}`}
                                >
                                {buttonText}
                            </FormSubmitButton>
                        }
                    </GridItem>
                    <GridItem>
                        <Img 
                            src={product?.image}
                            alt={product?.name ?? "An image of something"}
                        />
                    </GridItem>
                </Grid>
            </Box>
        </BlockContainer>
    )
}

export default CatalogFullColumn