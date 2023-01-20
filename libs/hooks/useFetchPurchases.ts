import { PurchaseInterface } from "@interfaces//purchases"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchPurchases = () => {
    const [ purchases, setPurchases ] = useState<PurchaseInterface[]>()
    const [ isLoadingPurchases, setIsLoadingPurchases ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const { data: response } = await axios.get('/api/purchases')
                const { data: response } = await axios.get('https://tokofront.vercel.app/api/purchases')
                setPurchases(response)
                // console.log ('response: ', response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingPurchases(false)
        }
        fetchData()
    }, [])

    return {
        purchases,
        isLoadingPurchases
    }
}