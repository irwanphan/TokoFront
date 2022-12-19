import { useState, useEffect } from "react"
import { Box, useDisclosure, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Flex, Divider, DrawerBody, DrawerFooter, Text } from "@chakra-ui/react"
import { AnchorMenuIconTrigger } from "@elements/AnchorMenu"
import FormSubmitButton from "@elements/FormSubmit"

import ModalPopup from "@units/ModalPopup"
import { useSession, signOut, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { RxExit } from "react-icons/rx"

import { CartDrawerInterface } from "@libs/interfaces/cartDrawer"
import { CartItems } from "../Cart"

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
                                <Flex>
                                    <Text fontWeight={600}>
                                        {session?.user?.name}
                                    </Text>
                                    <AnchorMenuIconTrigger tooltip="logout?" fontSize={18} p={1} ml={2}
                                        onOpen={onModalOpen}>
                                        <RxExit />
                                    </AnchorMenuIconTrigger>
                                </Flex>
                                <Text fontSize={12}>
                                    {session?.user?.email}
                                </Text>
                            </Box>
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