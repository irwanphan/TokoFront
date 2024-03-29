import { Grid, GridItem } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import { productsState, productsTrendingState } from '@libs/contexts/products'
import { useRecoilValue } from 'recoil'
import { BlockContainerLink, BlockContainerSlimLink } from "@elements/BlockContainer"
import { ItemInterface } from "@libs/interfaces/storeItem"
import { LoadingCatalog } from "@elements/LoadingBlock"

interface TokoCatalogProps {
    isTrending?: boolean
    settings: any
}

const TokoCatalog = ({ isTrending, settings }:TokoCatalogProps) => {
    const store = useRecoilValue<ItemInterface[]>(productsState)
    // console.log(store)
    const [ isLoadingProducts, setIsLoadingProducts ] = useState<boolean>(true)

    const storeTrending = useRecoilValue<ItemInterface[]>(productsTrendingState)
    // console.log(storeTrending)

    useEffect(() => {
        setIsLoadingProducts(false)
    }, [store])
    
    if (isLoadingProducts) return (
        <LoadingCatalog />
    )

    return (
        <Grid templateColumns={{base: '1fr', sm:'1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr'}} gap={4}>
            {
                isTrending ?
                storeTrending?.map((item:ItemInterface) => {
                    return (
                        <GridItem key={item.id}>
                            <BlockContainerLink href={`/products/${item.id}`} 
                                product={item}
                            />
                        </GridItem>
                    )
                })
            :   store?.map((item:ItemInterface) => {
                    return (
                        settings.settingMainPageMode === "store" ?
                        <GridItem key={item.id}>
                            <BlockContainerLink href={`/products/${item.id}`} 
                                product={item}
                            />
                        </GridItem> :
                        settings.settingMainPageMode === "sales" ?
                        <GridItem key={item.id}>
                            <BlockContainerSlimLink href={`/products/${item.id}`} 
                                product={item}
                            />
                        </GridItem> :
                        <></>
                    )
                })
            }
        </Grid>
    )
}

export default TokoCatalog