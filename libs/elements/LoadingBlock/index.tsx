import { Skeleton } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"

const LoadingBlock = () => {
    return (
        <BlockContainer>
            <Skeleton h={40} mb={3} />
            <Skeleton h={5} mb={3} />
            <Skeleton h={3} mb={3} />
        </BlockContainer>
    )
}

export default LoadingBlock