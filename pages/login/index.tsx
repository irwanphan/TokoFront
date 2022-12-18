import { BaseSyntheticEvent, useState } from "react"
import { Box, Flex, FormLabel, Grid, Input, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import { MdFace } from "react-icons/md"

const LoginPage = () => {

    const [ values, setValues ] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = (key: string) => (event: BaseSyntheticEvent) => {
        setValues({
            ...values,
            [key]: event.target.value
        })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const requestConfig = {
            path: '/login',
            method: 'POST',
            data: values
        }
        // requestSignIn(requestConfig)
        console.log(requestConfig)
    }
    
    return (
        <MainLayout>
            <Box textAlign='left' mb={8}>
                <Text fontSize={32}>
                    Hello
                </Text>
            </Box>
            <Grid templateColumns='1fr 1fr' >
                <BlockContainer>
                    <FormLabel>Your email</FormLabel>
                    <Input layerStyle='formInputBase' placeholder="e.g someone@registered.mail" 
                        onChange={ (event) => handleInputChange('email')(event) }
                    />
                    <Box mt={4} />
                    <FormLabel>Your password</FormLabel>
                    <Input layerStyle='formInputBase' type='password' placeholder="if 1234, change your password"
                        onChange={(event) => handleInputChange('password')(event)}
                    />
                    <Box mt={4} />
                    <Flex justifyContent='space-between' flexWrap='wrap'>
                        <Box>
                            {/* TODO: remember me */}
                        </Box>
                        <FormSubmitButton href="/login" buttonColor="green.100" 
                            onClick={handleSubmit}
                        >
                            <Box as={MdFace} mr={1} fontSize={20} />Login
                        </FormSubmitButton>
                    </Flex>
                </BlockContainer>
                {/* <BlockContainer>
                </BlockContainer> */}
            </Grid>
        </MainLayout>
    )
}

export default LoginPage