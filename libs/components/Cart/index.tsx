import { useEffect, useState } from "react"
import { Box, List, ListItem, Flex, Divider, useDisclosure, Skeleton } from "@chakra-ui/react"
import { cartState, checkCartState, removeFromCart } from "@libs/contexts/cart"
import { FiTrash, FiX } from "react-icons/fi"
import ModalPopup from "@units/ModalPopup"

import { useRecoilValue } from "recoil"
import { CartItemCheckoutInterface, CartItemInterface } from "@libs/interfaces/cartItem"
import CartTotal from "@components/CartTotal"
import { notify } from "@utils/notify"

export const CartItems = () => {
    const cart = useRecoilValue<CartItemInterface[]>(cartState)
    const checkCart = useRecoilValue<CartItemCheckoutInterface[]|any>(checkCartState)

    // TODO: minus and plus item on cart
    const handleRemoveFromCart = (scope:CartItemCheckoutInterface|any) => {
        const toBeDelete = cart.find((item:CartItemInterface) => item.id === scope.id)
        // console.log(toBeDelete) // cart item's id = store item's ref id
        const newCart = removeFromCart(cart, toBeDelete)
        localStorage.setItem("cart", JSON.stringify(newCart))
        // setCart(newCart) // set in context
        notify(`${toBeDelete?.name} removed from your cart`)
    }
    // handling delete modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ scope, setScope ] = useState<CartItemCheckoutInterface>()
    const modalProps = {
        title: `Remove ${scope?.name} From Cart`,
        texts: 'Are you really OK with this decision?',
        button: 'OK',
        action: () => {
            handleRemoveFromCart(scope)
            onClose()
        }
    }

    // loading item to cart
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    useEffect(() => {
        setIsLoading(false)
    }, [checkCart])

    if (isLoading) return (
        <Box>
            <Skeleton h={6} mb={2} />
            <Skeleton h={4} />
        </Box>
    )

    if (Object.keys(cart).length === 0) {
        return <Box>No Items</Box>
    }
    
    return (
        <Box>
            <List className="cart-items">
                {checkCart.map((cartItem:CartItemCheckoutInterface) => {
                    return (
                        <ListItem key={cartItem.id} mb={2} >
                            <Flex alignItems='center' mb={1}>
                                {cartItem?.name}
                                <Box 
                                    ml={2} p={1} 
                                    borderWidth='1px'
                                    borderStyle='solid'
                                    borderColor='gray.600'
                                    cursor='pointer'
                                    fontSize={12}
                                    transition='0.3s ease all'
                                    _hover={{ bgColor: 'orange.200' }}
                                    onClick={() => {
                                        setScope(cartItem)
                                        onOpen()
                                    }}
                                ><FiTrash /></Box>
                            </Flex>
                            <Flex
                                color='gray.600'
                                fontSize={12}
                                gap={1}
                                justifyContent='space-between'
                            >
                                <Flex alignItems='center'>
                                    {cartItem.quantity} <Box as={FiX}/> {cartItem.price}
                                </Flex>
                                <Box fontWeight={600}>
                                    {cartItem.subtotal}
                                </Box>
                            </Flex>
                            <Divider />
                        </ListItem>
                    )
                })}
            </List>

            <CartTotal />
            <ModalPopup modalProps={modalProps} isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}