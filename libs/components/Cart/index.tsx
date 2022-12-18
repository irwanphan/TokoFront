import { useEffect, useState } from "react"
import NextLink from 'next/link'
import { Box, List, ListItem, DrawerHeader, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerOverlay, Text, Flex, Divider, Button, useToast, Link, Stack, useDisclosure } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import { cartState, removeFromCart } from "@libs/contexts/cart"
import { FiTrash, FiX } from "react-icons/fi"
import { MdFace } from "react-icons/md"
import { GiNewBorn } from "react-icons/gi"
import { RxExit } from "react-icons/rx"

import { useRecoilState, useRecoilValue } from "recoil"

import { dummyItems, ItemInterface } from "@libs/interfaces/storeItem"
import { CartItemInterface } from "@libs/interfaces/cartItem"
import { CartDrawerInterface } from "@libs/interfaces/cartDrawer"
import BlockContainer from "@elements/BlockContainer"
import ModalPopup from "@units/ModalPopup"
import AnchorMenuIconTrigger from "@elements/AnchorMenu"

const totaling = () => {
    const cart = useRecoilValue(cartState)
    const inCart:any = cart.map( cartItem => dummyItems.find(x => x.id === cartItem.id) )
    const total = cart.reduce( (acc, {id, quantity}) =>
        acc + quantity * inCart.find((x:ItemInterface) => x.id === id).price, 0)
    // console.log(total)
    return total
}

const Total = () => {
    const total = totaling()
    return (
        <Flex flexDirection='column' textAlign='right' mt={4}>
            {/* TODO: add currency */}
            <Box fontSize={12}>Total (IDR)</Box>
            <Box fontWeight={600}>{total}</Box>
        </Flex>
    )
}

export const CartItems = () => {
    const [ cart, setCart ] = useRecoilState<CartItemInterface[]>(cartState)
    // const cart = useRecoilValue(cartState)

    useEffect(() => {
        const cartData = localStorage.getItem("cart")
        // console.log('storage: ', cartData)
        const parsedData = JSON.parse(cartData!)
        if (parsedData) {
            setCart(parsedData);
        }
    }, [])

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
    const handleRemoveFromCart = (product:ItemInterface|any) => {
        const newCart = removeFromCart(cart, product)
        localStorage.setItem("cart", JSON.stringify(newCart))
        setCart(newCart)
        notify(`${product.name} removed from your cart`)
    }

    // handling delete modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ scope, setScope ] = useState<ItemInterface>()
    const modalProps = {
        title: `Remove ${scope?.name} From Cart`,
        texts: 'Are you really OK with this decision?',
        button: 'OK',
        action: () => {
            handleRemoveFromCart(scope)
            onClose()
        }
    }
    
    if (Object.keys(cart).length === 0) {
        return <Box>No Items</Box>
    }
    
    return (
        <Box>
            <List className="cart-items">
                {cart.map((cartItem:CartItemInterface, index:number) => {
                    console.log(cart)
                    const selectedItem = dummyItems.find( item => {
                        return item.id === cartItem.id
                    })
                    // TODO: FIX: possibly undefined
                    const cartItemSubtotal = cartItem.quantity * selectedItem!.price
                    // console.log(item)
                    return (
                        <ListItem key={cartItem.id} mb={2} >
                            <Flex alignItems='center' mb={1}>
                                {cartItem.name}
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
                                        setScope(selectedItem)
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

            <Total />

            <ModalPopup modalProps={modalProps} isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}

export const CartDrawer = ({placement, onClose, isOpen}: CartDrawerInterface) => {
    const [ isLogin, setIsLogin ] = useState<boolean>(true)

    // handling logout modal
    const { isOpen:isModalOpen, onOpen:onModalOpen, onClose:onModalClose } = useDisclosure()
    const modalProps = {
        title: `Logging Out?`,
        texts: 'Come back safely',
        button: 'See You',
        action: () => {
            onModalClose(),
            setIsLogin(false)
        }
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
                                        Irwan Phan 
                                    </Text>
                                    <AnchorMenuIconTrigger tooltip="logout?" fontSize={18} p={1} ml={2}
                                        onClick={() => {
                                            onModalOpen()
                                        }}
                                    >
                                        <RxExit />
                                    </AnchorMenuIconTrigger>
                                    </Flex>
                                <Text fontSize={12}>
                                    Some Address Street, No. 88
                                </Text>
                                <Text fontSize={12}>
                                    Pontianak, Indonesia
                                </Text>
                            </Box>
                        </Box>
                      :
                        <Box>
                            <Text fontSize={12}>
                                You're not login yet
                            </Text>
                            <Flex gap={2}>
                                <FormSubmitButton href="/register">
                                    <Box as={GiNewBorn} mr={1} fontSize={20} />register
                                </FormSubmitButton>
                                <FormSubmitButton href="/login" buttonColor="green.100" >
                                    <Box as={MdFace} mr={1} fontSize={20} />Login
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
                        <FormSubmitButton href="/login" buttonColor="green.100" >
                            <Box as={MdFace} mr={1} fontSize={20} />Login to Checkout
                        </FormSubmitButton>
                    }
                </DrawerFooter>

                <ModalPopup modalProps={modalProps} isOpen={isModalOpen} onClose={onModalClose} canCancel />
            </DrawerContent>
        </Drawer>
    )
}
