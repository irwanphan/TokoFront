import { Box, List, ListItem, DrawerHeader, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerOverlay, Text, Flex, Divider } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import { cartState, CartItemInterface } from "@libs/contexts/cart"
import { FiX } from "react-icons/fi"
import { useRecoilValue } from "recoil"

import { dummyItems, ItemInterface } from "@data//dummy_items"

export const CartItems = () => {
    const cart = useRecoilValue(cartState)

    if (Object.keys(cart).length === 0) {
        return <Box>No Items</Box>
    }
    return (
        <Box>
            <List className="cart-items">
                {cart.map((cartItem:CartItemInterface, index:number) => {
                    const selectedItem = dummyItems.find( item => {
                        return item.id === cartItem.id
                    })
                    // TODO: FIX: possibly undefined
                    const cartItemSubtotal = cartItem.quantity * selectedItem!.price
                    // console.log(item)
                    return (
                        <ListItem key={cartItem.id}
                            mb={2}
                        >
                            <Box>
                                {cartItem.name}
                            </Box>
                            <Flex
                                color='gray.600'
                                fontSize={12}
                                gap={1}
                                justifyContent='space-between'
                            >
                                <Flex
                                    alignItems='center'
                                >
                                    {/* TODO: FIX: possibly undefined */}
                                    {cartItem.quantity} <Box as={FiX}/> {selectedItem!.price}
                                </Flex>
                                <Box fontWeight={600}>
                                    {cartItemSubtotal}
                                </Box>
                            </Flex>
                            <Divider />
                        </ListItem>
                    )
                })}
            </List>
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
