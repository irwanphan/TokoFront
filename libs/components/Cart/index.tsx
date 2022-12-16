import { Box, OrderedList, ListItem, DrawerHeader, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerOverlay } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import { cartState, CartItemInterface } from "@libs/contexts/cart"
import { useRecoilValue } from "recoil"

export const CartItems = () => {
    const cart = useRecoilValue(cartState)

    if (Object.keys(cart).length === 0) {
        return <Box>No Items</Box>
    }
    return (
        <Box>
            <OrderedList className="cart-items">
                {cart.map((item:CartItemInterface) => {
                    console.log(item)
                    return (
                        <ListItem key={item.id}>{item.name}: {item.quantity}</ListItem>
                    )
                })}
            </OrderedList>
        </Box>
    )
}

interface CartDrawerProps {
    placement: string | any
    isOpen?: boolean
    onOpen?: () => void
    onClose?: () => void
    onToggle?: () => void
}

export const CartDrawer = ({placement, onClose, isOpen}: CartDrawerProps) => {
    return (
        <Drawer placement={placement} onClose={onClose!} isOpen={isOpen!} size="md">
            <DrawerOverlay />
            <DrawerContent borderLeft='2px solid black'>
                <DrawerHeader>Your Cart</DrawerHeader>
                <DrawerBody>
                    <CartItems />
                </DrawerBody>

                <DrawerFooter>
                    <FormSubmitButton notLink onClick={onClose} mr={2}>
                        Cancel
                    </FormSubmitButton>
                    <FormSubmitButton href="/" buttonColor="green.100" >
                        Checkout
                    </FormSubmitButton>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
