import { Box, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Divider, DrawerBody, DrawerFooter } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import { CartDrawerInterface } from "@libs/interfaces/cartDrawer"
import { CartItems } from "../Cart"
import TokoAuth from "@components/TokoAuth"
import { useAuth } from "@contexts/authContext"

const TokoSearch = ({placement, onClose, isOpen}: CartDrawerInterface) => {

    const toast = useToast()
    
    return (
        <Drawer placement={placement} onClose={onClose!} isOpen={isOpen!} size="full">
            <DrawerOverlay />
            <DrawerContent borderLeft='2px solid black'>
                <DrawerHeader>
                    Search Product
                </DrawerHeader>
                <DrawerBody>
                    
                </DrawerBody>

                <DrawerFooter>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default TokoSearch