import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Box, Flex, Grid, GridItem, Text, useControllableState } from "@chakra-ui/react"
import { BlockImage } from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"

import { handleAddToCart } from "@libs/components/Cart"
import { dummyItems, ItemInterface } from "@libs/interfaces/storeItem"

const ProductDetailView = () => {
    const router = useRouter()
    const { pid }:any = router.query
    const [ obj, setObj ] = useState<ItemInterface>({
        id: '',
        name: '',
        description: '',
        price: 0,
        image: ''
    })

    const [qid, setQid] = useState<number|any>()
    useEffect(() => {
        setQid(pid)
        // see item as queried id
        const selected:ItemInterface|undefined = dummyItems.find( item => item.id === pid )
        if (selected !== undefined) setObj(selected)
        // console.log(selected)
    },[pid])

    const [value, setValue] = useState(1)
    const [internalValue, setInternalValue] = useControllableState({
        value,
        onChange: setValue,
    })

    if (!qid) { return ( <MainLayout>Loading . . .</MainLayout> ) }

    return (
        <MainLayout>
            <Grid templateColumns='1fr 1fr' gap={8}>
                <GridItem>
                    <BlockImage imgUrl={obj.image} />
                </GridItem>
                <GridItem>
                    <Text fontSize={24} fontWeight={600}>
                        {/* {title} */}
                        {obj.name}
                    </Text>
                    <Text mb={4}>
                        {/* IDR 800000 */}
                        IDR {obj.price}
                    </Text>
                    <Text fontSize={14} mb={4} color='blackAlpha.800'>
                        {/* {description} */}
                        {obj.description}
                    </Text>

                    <Flex mb={2}>
                        <FormSubmitButton notLink px={2}
                            onClick={() => setInternalValue(value - 1)}>
                            -
                        </FormSubmitButton>
                        <Box
                            bgColor='whiteAlpha.700'
                            borderTop='1px solid black'
                            borderBottom='1px solid black'
                            py={2} px={4} h={10}
                        >
                            {internalValue}
                        </Box>
                        <FormSubmitButton notLink px={2}
                            onClick={() => setInternalValue(value + 1)}>
                            +
                        </FormSubmitButton>
                    </Flex>

                    <FormSubmitButton notLink
                        onClick={ () => handleAddToCart(obj, value) } >
                        Add to Cart
                    </FormSubmitButton>
                </GridItem>
            </Grid>
        </MainLayout>
    )
}

export default ProductDetailView