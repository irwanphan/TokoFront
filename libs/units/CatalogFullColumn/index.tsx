import { Box, Grid, FlexProps, Text, GridItem } from '@chakra-ui/react'
import FormSubmitButton from '@elements/FormSubmit'

interface CatalogColumnProps extends FlexProps {
    title: string
    price: number
    currency: string
    color?: string
    borderColor?: string
    bgColor?: string
    href: string
    buttonColor?: string
    buttonBorderColor?: string
    buttonTextColor?: string
}

const CatalogFullColumn = ( {title, price, currency, href, color, borderColor, bgColor, children, ...rest}: CatalogColumnProps ) => {
    return (
        <Box
            bgColor='black'
            paddingTop='1px'
            paddingLeft='1px'
            paddingRight='2px'
            paddingBottom='4px'
        >
            <Box
                p='2rem'
                bgColor={bgColor ?? 'white'}
                {...rest}
            >
                <Grid templateColumns='1fr 1fr'>
                    <GridItem>
                        <Text>{title}</Text>
                        <Text>{currency} {price}</Text>
                        {children}
                        <FormSubmitButton
                            href={href}
                        >
                            asdf
                        </FormSubmitButton>
                    </GridItem>
                    <GridItem>asdf</GridItem>
                </Grid>
            </Box>
        </Box>
    )
}

export default CatalogFullColumn