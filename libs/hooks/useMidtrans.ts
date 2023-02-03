import axios from "axios"
import { useState, useEffect } from "react"

export const useMidtrans = () => {
    const [ token, setToken ] = useState()
    const [ isLoadingToken, setIsLoadingToken ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await await axios.get('/api/payment')
                setToken(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingToken(false)
        }
        fetchData()
    }, [])

    return {
        token,
        isLoadingToken
    }
}