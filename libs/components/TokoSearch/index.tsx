import { Box, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { CartDrawerInterface } from "@libs/interfaces/cartDrawer"
import { FiSearch } from "react-icons/fi"
import axios from "axios"
import { useState } from "react"
import { ItemInterface } from "@interfaces//storeItem"

const TokoSearch = ({placement, onClose, isOpen}: CartDrawerInterface) => {
    const [ search, setSearch ] = useState('')
    const [ searchResult, setSearchResult ] = useState<ItemInterface[]>()

    const toast = useToast()
    const searchByKeyword = (keyword:any) => axios.get(`/api/products/get-by-keyword/?keyword=${search}`, keyword)
    
    const onSubmit = async (keyword:string) => {
        const products:ItemInterface[]|any = await searchByKeyword(keyword)
        // console.log(products.data)
        setSearchResult(products.data)
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
                        onSubmit(search)
                    }}>
                        <InputGroup>
                            <InputRightElement>
                                <FiSearch />
                            </InputRightElement>
                            <Input onChange={(e) => setSearch(e.target.value)} />
                        </InputGroup>
                    </form>

                    {
                        searchResult?.map((item) => {
                            return(
                                <Box>{item.name}</Box>
                            )
                        })
                    }

                </DrawerBody>

                <DrawerFooter>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default TokoSearch