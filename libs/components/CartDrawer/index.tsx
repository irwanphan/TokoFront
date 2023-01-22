import { useState, useEffect } from "react"
import { Box, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Divider, DrawerBody, DrawerFooter } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import { FcGoogle } from "react-icons/fc"
import { CartDrawerInterface } from "@libs/interfaces/cartDrawer"
import { CartItems } from "../Cart"
// import { useSession, signIn } from "next-auth/react"
import TokoAuth from "@components/TokoAuth"
import { signInWithGoogle } from "@libs/connections/signIn"

const CartDrawer = ({placement, onClose, isOpen}: CartDrawerInterface) => {
    const [ isLogin, setIsLogin ] = useState<boolean>(false)
    // const { data: session } = useSession()
    // console.log(session)
    // useEffect(() => {
    //     if (session) {
    //         setIsLogin(true)
    //     }
    // })

    // handle signinWithGoogle to Checkout
    const toast = useToast()
    const signInWithGoogleCheckout = () => {
        toast({title:'Redirecting...'})
        // Perform sign in
        // signIn('google', {
        //     callbackUrl: '/checkout',
        // })
    }
    
    return (
        <Drawer placement={placement} onClose={onClose!} isOpen={isOpen!} size="md">
            <DrawerOverlay />
            <DrawerContent borderLeft='2px solid black'>
                <DrawerHeader>
                    {/* <TokoAuth /> */}
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
                        <FormSubmitButton 
                            onClick={() => signInWithGoogle()}
                            href="/" buttonColor="green.50" >
                            <Box as={FcGoogle} mr={1} fontSize={20} />Login to Checkout
                        </FormSubmitButton>
                    }
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CartDrawer