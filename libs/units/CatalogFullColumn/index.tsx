import { FlexProps, Grid, GridItem, Text } from '@chakra-ui/react'
import BlockContainer from '@elements/BlockContainer'
import FormSubmitButton from '@elements/FormSubmit'

interface CatalogColumnProps extends FlexProps {
    title: string
    price: number
    currency: string
    color?: string
    borderColor?: string
    bgColor?: string
    href: string
    haveButton?: boolean
    buttonText?: string
    buttonColor?: string
    buttonBorderColor?: string
    buttonTextColor?: string
}

const CatalogFullColumn = ( {title, price, currency, href, color, borderColor, bgColor, haveButton, buttonText, buttonColor, buttonBorderColor, buttonTextColor, ...rest}: CatalogColumnProps ) => {
    return (
        <BlockContainer {...rest}>
            <Grid templateColumns='1fr 1fr'>
                <GridItem>
                    <Text fontSize={28} mb={4}>{title}</Text>
                    <Text mb={3}>{currency} {price}</Text>
                    {
                        haveButton &&
                        <FormSubmitButton
                            href={href}
                            >
                            {buttonText}
                        </FormSubmitButton>
                    }
                </GridItem>
                <GridItem>
                    {/* TODO: retrive picture here */}
                </GridItem>
            </Grid>
        </BlockContainer>
    )
}

export default CatalogFullColumn