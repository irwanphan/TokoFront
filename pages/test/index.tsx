import { Button } from "@chakra-ui/react"
import { useMidtrans } from "@hooks/useMidtrans"
import MainLayout from "@layouts//MainLayout"
import axios from "axios"

const TestPage = () => {
    const testMid = async () => {
        var res = await axios.get('/api/payment')
        return res
    }

    const getTransactionToken = () => {
        console.log('tesMid Response', testMid())
        return 'transaction-token'
    }
    
    return (
        <MainLayout>
            <Button onClick={() => getTransactionToken()} >Run</Button>
        </MainLayout>
    )
}

export default TestPage