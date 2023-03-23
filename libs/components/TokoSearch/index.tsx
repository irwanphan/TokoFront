import { Box, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, Divider, DrawerBody, DrawerFooter, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import { CartDrawerInterface } from "@libs/interfaces/cartDrawer"
import { CartItems } from "../Cart"
import TokoAuth from "@components/TokoAuth"
import { useAuth } from "@contexts/authContext"
import { FiSearch } from "react-icons/fi"
import axios from "axios"
import { useState } from "react"
import { useFetchCatalogSearch } from "@hooks/useFetchCatalogSearch"

const TokoSearch = ({placement, onClose, isOpen}: CartDrawerInterface) => {
    const [ search, setSearch ] = useState('')

    const toast = useToast()
    const searchByKeyword = (keyword:any) => axios.get(`/api/products/get-by-keyword/?keyword=${search}`, keyword)
    
    const onSubmit = async (keyword:string) => {
        console.log(keyword)
        const products = await searchByKeyword(keyword)
        console.log(products.data)
    }

    return (
        <Drawer placement={placement} onClose={onClose!} isOpen={isOpen!} size="full">
            <DrawerOverlay />
            <DrawerContent borderLeft='2px solid black'>
                <DrawerHeader>
                    Search Product
                </DrawerHeader>
                <DrawerBody>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        console.log(search)
                        onSubmit(search)
                    }}>
                        <InputGroup>
                            <InputRightElement>
                                <FiSearch />
                            </InputRightElement>
                            <Input onChange={(e) => setSearch(e.target.value)} />
                        </InputGroup>
                    </form>


                </DrawerBody>

                <DrawerFooter>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default TokoSearch