import { Box, Button, FlexProps } from '@chakra-ui/react'
import NextLink from 'next/link' 

interface FormSubmitProps extends FlexProps {
    href?: string
    buttonColor?: string
    buttonBorderColor?: string
    buttonTextColor?: string
    notLink?: boolean
    isDisabled?: boolean
}

interface ButtonManifestProps extends FlexProps {
    isDisabled?: boolean
    buttonColor: string | undefined
    buttonBorderColor: string | undefined
    buttonTextColor: string | undefined
}

const ButtonManifest = ({buttonColor, buttonBorderColor, buttonTextColor, isDisabled, children, ...rest}: ButtonManifestProps) => {
    return (
        <Box as={Button}
            py={2} px={6}
            borderRadius={0}
            borderTopWidth='1px'
            borderLeftWidth='1px'
            borderRightWidth='2px'
            borderBottomWidth='3px'
            borderStyle='solid'
            color={buttonTextColor ?? 'black'}
            bgColor={isDisabled ? 'gray.200' : buttonColor ? buttonColor : 'white'}
            borderColor={buttonBorderColor ?? 'black'}
            width='max-content'
            isDisabled={isDisabled}
            _hover={{
                bgColor: 'black',
                color: 'white'
            }}
            {...rest}
        >
            {children}
        </Box>
    )
}

const FormSubmitButton = ({href, buttonColor, buttonBorderColor, buttonTextColor, notLink, isDisabled, children, ...rest }: FormSubmitProps) => {
    if (notLink) {
        return (
            <ButtonManifest
                buttonTextColor={buttonTextColor}
                buttonColor={buttonColor}
                buttonBorderColor={buttonBorderColor}
                isDisabled={isDisabled}
                {...rest}
            >
                {children}
            </ButtonManifest>
        )
    }
    return (
        <NextLink href={href!} passHref>
            <ButtonManifest
                buttonTextColor={buttonTextColor}
                buttonColor={buttonColor}
                buttonBorderColor={buttonBorderColor}
                isDisabled={isDisabled}
                {...rest}
            >
                {children}
            </ButtonManifest>
        </NextLink>
    )
}

export default FormSubmitButton