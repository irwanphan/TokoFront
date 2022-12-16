import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack, useDisclosure } from "@chakra-ui/react"
import AnchorMenuIcon, { AnchorMenuIconTrigger, AnchorMenuText } from "@elements/AnchorMenu"
import FormSubmitButton from "@elements/FormSubmit"
import { CartItems } from "pages/products/[pid]"
import { useState } from "react"
import { AiOutlineShop } from "react-icons/ai"
import { RiShoppingCartFill } from "react-icons/ri"
// import { InView, useInView } from "react-intersection-observer"

const AnchorMenuNav = () => {
    // const { ref, inView } = useInView({
    //     threshold: 0,
    //     rootMargin: '8rem'
    // })

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ placement, setPlacement ] = useState<string|any>('right')
    
    return (
        <Box>
        {/* <InView> */}
            {/* {({inView, ref}) => */}
                <Box>
                    {/* <Box ref={ref} h='6rem' position={inView ? 'absolute' : 'relative'} /> */}
                    <Flex  
                        w='full' 
                        mx='auto'
                        justifyContent='space-between'
                        // alignItems='center'
                        // justifyContent='center'
                        // position={!inView ? 'fixed' : 'relative'}
                        // bgColor={!inView ? 'whiteAlpha.900' : 'transparent'}
                        h='6rem' 
                        transition='0.3s ease all'
                        zIndex={2}
                        // px={{ base: 0, md: 8 }}
                        // rounded={{ base: 'none', md: '2xl' }}
                        // borderWidth={{ base: '1px 0 0 0', md: '1px 2px 3px 1px' }}
                        // borderStyle='solid'
                        // borderColor={!inView ? 'gray.800' : 'transparent'}
                        // boxShadow={!inView ? '2xl' : 'none'}
                        // bottom={-4} left={0} right={0}        
                        >
                        <HStack gap={4}>
                            <AnchorMenuIcon href="/" mb={-1}>
                                <AiOutlineShop />
                            </AnchorMenuIcon>
                            <AnchorMenuText href='/'>
                                Home
                            </AnchorMenuText>
                            <AnchorMenuText href='/products'>
                                All Products
                            </AnchorMenuText>
                        </HStack>
                        {/* <Box position='fixed' top={0} right={0}>{inView.toString()}</Box> */}

                        <HStack gap={4}>
                            <AnchorMenuIconTrigger mb={-1} tooltip='you got something' onOpen={onOpen}>
                                <RiShoppingCartFill />
                            </AnchorMenuIconTrigger>
                        </HStack>
                    </Flex>
                </Box>
            {/* } */}
        {/* </InView> */}

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size="md">
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
                        <FormSubmitButton href="/" buttonColor="blue.200" >
                            Checkout
                        </FormSubmitButton>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </Box>
    )
}

export default AnchorMenuNav