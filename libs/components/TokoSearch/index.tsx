import { useToast, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Input, InputGroup, InputRightElement, Grid, GridItem, DrawerCloseButton } from "@chakra-ui/react"
import { CartDrawerInterface } from "@libs/interfaces/cartDrawer"
import { FiSearch } from "react-icons/fi"
import axios from "axios"
import { useState } from "react"
import { ItemInterface } from "@interfaces//storeItem"
import { BlockContainerLink } from "@elements/BlockContainer"

const TokoSearch = ({placement, onClose, isOpen}: CartDrawerInterface) => {
    const [ search, setSearch ] = useState('')
    const [ searchResult, setSearchResult ] = useState<ItemInterface[]>()

    // const toast = useToast()
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
                </DrawerHeader>
                <DrawerCloseButton />
                <DrawerBody>
                    <Grid templateColumns={{base: '1fr', sm:'1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr'}} gap={4}>
                        {
                            searchResult?.map((item:ItemInterface) => {
                                return (
                                    <GridItem key={item.id}>
                                        <BlockContainerLink href={`/products/${item.id}`} 
                                            product={item}
                                        />
                                    </GridItem>
                                )
                            })
                        }
                    </Grid>
                </DrawerBody>
                {/* <DrawerFooter></DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    )
}

export default TokoSearch