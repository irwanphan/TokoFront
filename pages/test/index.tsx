import { Button } from "@chakra-ui/react"
import { useMidtrans } from "@hooks/useMidtrans"
import MainLayout from "@layouts//MainLayout"
import axios from "axios"

const TestPage = () => {
    const testMid = () => {
        const res:any = axios.get('/api/payment')
            .then((res) => console.log(res.data))
            .catch((e) => {throw(e)})
    }
    
    return (
        <MainLayout>
            <Button onClick={() => testMid()} >Run</Button>
        </MainLayout>
    )
}

export default TestPage