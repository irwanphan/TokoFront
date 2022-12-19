import { Box, Flex, HStack, useDisclosure } from "@chakra-ui/react"
import AnchorMenuIcon, { AnchorMenuIconTrigger, AnchorMenuText } from "@elements/AnchorMenu"
import CartDrawer from "@libs/components/CartDrawer"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiOutlineShop } from "react-icons/ai"
import { RiShoppingCartFill } from "react-icons/ri"
import { InView } from "react-intersection-observer"

const AnchorMenuNav = () => {
    const router = useRouter()
    const path = router.pathname

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ placement, setPlacement ] = useState<string|any>('right')
    
    return (
        <Box>
        <InView>
            {({inView, ref}) =>
                <Box>
                    <Box ref={ref} h={{ base: '4rem', md: '6rem' }} position={inView ? 'absolute' : 'relative'} />
                    <Flex  
                        w='full' 
                        mx='auto'
                        justifyContent='space-between'
                        position={!inView ? 'fixed' : 'relative'}
                        bgColor={!inView ? 'whiteAlpha.900' : 'transparent'}
                        h={{ base: '4rem', md: '6rem' }}
                        transition='0.3s ease all'
                        zIndex={2}
                        px={ 
                            !inView ? { base: 4, md: 10 } 
                                    : { base: 0, md: 0 }
                            }
                        borderWidth='0 0 3px 0'
                        borderStyle='solid'
                        borderColor={!inView ? 'gray.800' : 'transparent'}
                        boxShadow={!inView ? '2xl' : 'none'}
                        top={0} left={0} right={0}        
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
                            {
                                path == '/checkout' ? '' :
                                <AnchorMenuIconTrigger mb={-1} tooltip='you got something' onOpen={onOpen}>
                                    <RiShoppingCartFill />
                                </AnchorMenuIconTrigger>
                            }
                        </HStack>
                    </Flex>
                </Box>
            }
        </InView>

            <CartDrawer placement={placement} onClose={onClose} isOpen={isOpen} />
        </Box>
    )
}

export default AnchorMenuNav