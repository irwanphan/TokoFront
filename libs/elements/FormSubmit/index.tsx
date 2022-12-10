import { Button, FlexProps } from '@chakra-ui/react'
import NextLink from 'next/link' 

interface FormSubmitProps extends FlexProps {
    href: string
    buttonColor?: string
    buttonBorderColor?: string
    buttonTextColor?: string
}

const FormSubmitButton = ({href, buttonColor, buttonBorderColor, buttonTextColor, children }: FormSubmitProps) => {
    return (
        <NextLink href={href} passHref>
            <Button
                py={2} px={6}
                borderRadius={0}
                borderTopWidth='1px'
                borderLeftWidth='1px'
                borderRightWidth='2px'
                borderBottomWidth='3px'
                borderStyle='solid'
                color={buttonTextColor ?? 'black'}
                bgColor={buttonColor ?? 'transparent'}
                borderColor={buttonBorderColor ?? 'black'}
                width='max-content'
                _hover={{
                    bgColor: 'black',
                    color: 'white'
                }}
            >
                {children}
            </Button>
        </NextLink>
    )
}

export default FormSubmitButton