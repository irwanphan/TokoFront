import { Button } from "@chakra-ui/react"
import { useMidtrans } from "@hooks/useMidtrans"
import MainLayout from "@layouts//MainLayout"

const TestPage = () => {
    const { token, isLoadingToken } = useMidtrans()

    // getting token
    if (isLoadingToken) {
        return (
            <MainLayout>
                ... getting token
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <Button onClick={() => console.log(token)} >Check</Button>
        </MainLayout>
    )
}

export default TestPage