import { useState, useEffect } from "react"
import { Box, useDisclosure, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Flex, Divider, DrawerBody, DrawerFooter, Text } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"

import ModalPopup from "@units/ModalPopup"
import { useSession, signOut, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { RxExit } from "react-icons/rx"

import { CartDrawerInterface } from "@libs/interfaces/cartDrawer"
import { CartItems } from "../Cart"
import SessionProfile from "@units/SessionProfile"

const CartDrawer = ({placement, onClose, isOpen}: CartDrawerInterface) => {
    const [ isLogin, setIsLogin ] = useState<boolean>(false)
    const { data: session } = useSession()
    // console.log(session)
    useEffect(() => {
        if (session) {
            setIsLogin(true)
        }
    })

    // handling logout modal
    const { isOpen:isModalOpen, onOpen:onModalOpen, onClose:onModalClose } = useDisclosure()
    const modalProps = {
        title: `Logging Out?`,
        texts: 'Come back safely',
        button: 'See You',
        action: () => {
            onModalClose(),
            setIsLogin(false),
            signOut()
        }
    }

    // handle signinWithGoogle
    const toast = useToast()
    const signInWithGoogle = () => {
        toast({title:'Redirecting...'});
        // Perform sign in
        signIn('google', {
            callbackUrl: window.location.href,
        })
    }
    
    return (
        <Drawer placement={placement} onClose={onClose!} isOpen={isOpen!} size="md">
            <DrawerOverlay />
            <DrawerContent borderLeft='2px solid black'>
                <DrawerHeader>
                    { isLogin ? 
                        <Box>
                            <Text fontSize={12}>
                                Hi there,
                            </Text>
                            <Box mt={1} mb={3}
                                borderLeftColor='blue.300'
                                borderLeftWidth='0.5rem'
                                borderLeftStyle='solid'
                                paddingLeft={2}>
                                <SessionProfile session={session}/>
                            </Box>
                            <FormSubmitButton href="/admin-area" mr={2} px={3} >
                                Admin Area
                            </FormSubmitButton>
                            <FormSubmitButton notLink px={3}
                                onClick={() => onModalOpen()}>
                                <Box as={RxExit} mr={2} /> Logout
                            </FormSubmitButton>
                        </Box>
                      :
                        <Box>
                            <Text fontSize={12}>
                                You're not login yet
                            </Text>
                            <Flex gap={2}>
                                {/* <FormSubmitButton href="/register">
                                    <Box as={GiNewBorn} mr={1} fontSize={20} />register
                                </FormSubmitButton> */}
                                <FormSubmitButton 
                                    onClick={() => signInWithGoogle()}
                                    href="/">
                                    <Box as={FcGoogle} mr={1} fontSize={20} />Login
                                </FormSubmitButton>
                            </Flex>
                        </Box>
                    }
                    <Divider />
                    Your Cart
                </DrawerHeader>
                <DrawerBody>
                    <CartItems />
                </DrawerBody>

                <DrawerFooter>
                    <FormSubmitButton notLink onClick={onClose} mr={2}>
                        Cancel
                    </FormSubmitButton>
                    { isLogin ?
                        <FormSubmitButton href="/checkout" buttonColor="green.100" >
                            Checkout
                        </FormSubmitButton>
                      :
                        <FormSubmitButton href="/checkout" buttonColor="green.50" >
                            <Box as={FcGoogle} mr={1} fontSize={20} />Login to Checkout
                        </FormSubmitButton>
                    }
                </DrawerFooter>

                <ModalPopup modalProps={modalProps} isOpen={isModalOpen} onClose={onModalClose} canCancel />
            </DrawerContent>
        </Drawer>
    )
}

export default CartDrawer