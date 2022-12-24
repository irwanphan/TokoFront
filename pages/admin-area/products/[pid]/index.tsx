import { Box, Grid, Skeleton, useToast } from "@chakra-ui/react"
import { productsState, loadProducts } from "@contexts/products"
import BlockContainer from "@elements/BlockContainer"
import LoadingBlock from "@elements/LoadingBlock"
import { ItemInterface } from "@interfaces//storeItem"
import MainLayout from "@layouts//MainLayout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

const ProductDetailViewPage = () => {
    const [ isLoadingProduct, setIsLoadingProduct ] = useState<boolean>(true)
    
    const router = useRouter()
    const { pid }:any = router.query
    const [ obj, setObj ] = useState<ItemInterface>({
        id: '',
        name: '',
        description: '',
        price: 0,
        image: ''
    })

    // handling ShowItem
    const [ store, setStore ] = useRecoilState<ItemInterface[]>(productsState)
    const [ stock, setStock ] = useState<number>()
    const [ inCart, setInCart ] = useState<number>()
    const [ qid, setQid ] = useState<number|any>()
    
    const toast = useToast()

    useEffect(() => {
        // TODO: API for get single product
        const products = loadProducts()
        .then(res => setStore(res))
        // .then(() => setIsLoadingProducts(false))
        .catch(e => {
            toast({
                title: 'Error',
                description: `You're not connected to our server!`,
                render: () => (
                    <BlockContainer py={4} px={6} bgColor="green.100">You're not connected to our server!</BlockContainer>
                )
            })
            // console.error(e.response.status)
        })
        setQid(pid)
    }, [pid] )
    useEffect(() => {
        const selected:ItemInterface|undefined = store.find( item => item.id === pid )
    }, [store] )

    if (isLoadingProduct) return (
        <MainLayout>
            <Grid templateColumns={{base: '1fr', md: '1fr 1fr'}} gap={4}>
                <LoadingBlock />
                <Box>
                    <Skeleton h={12} mb={4} />
                    <Skeleton h={6} mb={2} />
                    <Skeleton h={4} mb={6} />
                    <Skeleton h={8} w={40} />
                </Box>
            </Grid>
        </MainLayout>
    )

    return (
        <MainLayout>
            
        </MainLayout>
    )
}

export default ProductDetailViewPage