import { PurchasesInterface } from "@interfaces//purchases"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchPurchases = () => {
    // TODO: purchases type
    const [ purchases, setPurchases ] = useState<PurchasesInterface[]>()
    const [ isLoadingPurchases, setIsLoadingPurchases ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/purchases')
                setPurchases(response)
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