import { Grid, GridItem, useToast } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import { loadProducts, productsState } from '@libs/contexts/products'
import { useRecoilState } from 'recoil'
import BlockContainer, { BlockContainerLink } from "@elements/BlockContainer"
import { ItemInterface } from "@libs/interfaces/storeItem"
import LoadingBlock from "@elements/LoadingBlock"

const TokoCatalog = () => {
    const toast = useToast()
    const [ store, setStore ] = useRecoilState<ItemInterface[]>(productsState)
    // console.log(store)
    const [ isLoadingProducts, setIsLoadingProducts ] = useState<boolean>(true)

    useEffect(() => {
        const products = loadProducts()
        .then(res => setStore(res))
        .then(() => setIsLoadingProducts(false))
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
    }, [])
    
    if (isLoadingProducts) return (
        <Grid templateColumns={{base: '1fr', sm:'1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr'}} gap={4}>
            <LoadingBlock />
            <LoadingBlock />
            <LoadingBlock />
            <LoadingBlock />
        </Grid>
    )

    return (
        <Grid templateColumns={{base: '1fr', sm:'1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr'}} gap={4}>
            {
                store?.map((item:ItemInterface) => {
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
    )
}

export default TokoCatalog