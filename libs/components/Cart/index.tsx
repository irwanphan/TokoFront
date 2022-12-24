import { useEffect, useState } from "react"
import { Box, List, ListItem, Flex, Divider, useToast, useDisclosure, Skeleton } from "@chakra-ui/react"
import { cartState, removeFromCart } from "@libs/contexts/cart"
import { FiTrash, FiX } from "react-icons/fi"

import { useRecoilState, useRecoilValue } from "recoil"

import { ItemInterface } from "@libs/interfaces/storeItem"
import { CartItemCheckoutInterface, CartItemInterface } from "@libs/interfaces/cartItem"
import BlockContainer from "@elements/BlockContainer"
import ModalPopup from "@units/ModalPopup"
import { productsState } from "@libs/contexts/products"
import CartTotal from "../CartTotal"
import LoadingBlock from "@elements/LoadingBlock"

export const crossCheck = (cart:CartItemInterface[], store:ItemInterface[]) => {
    const newCart = [...cart]
    newCart.map((cartItem:CartItemInterface, index:number) => {
        const selectedItem = store.find( (item:ItemInterface) => {
            return item.id === cartItem.id
        })
        // console.log(selectedItem)
        if (selectedItem) {
            const newCartItem = {
                ...newCart[index],
                price: selectedItem.price,
                subtotal: cartItem.quantity * selectedItem.price
            }
            // console.log('current cart item: ',newCartItem)
            newCart[index] = newCartItem
        }
    })
    // console.log('new cart: ',newCart)
    return newCart
}

export const CartItems = () => {
    const [ cart, setCart ] = useRecoilState<CartItemInterface[]>(cartState)
    const [ checkCart, setCheckCart ] = useState<CartItemCheckoutInterface[]|any>([])
    const store = useRecoilValue(productsState)

    // handling notification
    const toast = useToast()
    const notify = (message:string) => {
        toast({
            duration: 1500,
            position: 'bottom-right',
            render: () => (
                <BlockContainer py={4} px={6}>{message}</BlockContainer>
            )
        })
    }

    // TODO: minus and plus item on cart
    const handleRemoveFromCart = (product:CartItemCheckoutInterface|any) => {
        const toBeDelete = store.find((item) => item.id === product.id)
        const newCart = removeFromCart(cart, toBeDelete)
        localStorage.setItem("cart", JSON.stringify(newCart))
        setCart(newCart)
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
        const cartData = localStorage.getItem("cart")
        // console.log('storage: ', cartData)
        const parsedData = JSON.parse(cartData!)
        if (parsedData) {
            setCart(parsedData);
        }
    }, [])

    useEffect(() => {
        if (Object.keys(cart).length !== 0) {
            const newCart = crossCheck(cart, store)
            setCheckCart(newCart)
        }

        setIsLoading(false)
    }, [cart])
    console.log('check cart',checkCart)

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
                                    {/* TODO: FIX: possibly undefined */}
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