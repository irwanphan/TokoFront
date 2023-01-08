import { Box, Flex, Skeleton } from "@chakra-ui/react"
import useCartTotal from "@hooks/useCartTotal"

const CartTotal = () => {
    const { total, isLoadingTotal } = useCartTotal()

    if (isLoadingTotal) return (
        <Box>
            <Skeleton height={4} mb={2} />
            <Skeleton height={6} />
        </Box>
    )

    return (
        <Flex flexDirection='column' textAlign='right' mt={4}>
            {/* TODO: add currency */}
            <Box fontSize={12}>Total (IDR)</Box>
            <Box fontWeight={600}>{total}</Box>
        </Flex>
    )
}

export default CartTotal