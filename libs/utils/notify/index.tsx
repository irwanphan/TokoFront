import { useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"

// handling notification
export const notify = (message:String) => {
    const toast = useToast()
    toast({
        duration: 1500,
        position: 'bottom-right',
        render: () => (
            <BlockContainer py={4} px={6}>{message}</BlockContainer>
        )
    })
}