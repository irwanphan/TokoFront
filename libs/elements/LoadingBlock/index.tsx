import { Box, FlexProps, Skeleton } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"

const LoadingBlock = ({children}: FlexProps) => {
    return (
        <BlockContainer>
            <Skeleton h={40} mb={3} />
            <Skeleton h={5} mb={3} />
            <Skeleton h={3} mb={3} />
            {children}
        </BlockContainer>
    )
}

export const LoadingBlockList = () => {
    return (
        <Box>
            <Skeleton h={6} mb={2} />
            <Skeleton h={4} />
        </Box>
    )
}

export default LoadingBlock