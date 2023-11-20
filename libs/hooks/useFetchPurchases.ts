import { PurchaseInterface } from "@interfaces//purchases"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchPurchases = (userId:string|undefined) => {
    const [ purchases, setPurchases ] = useState<PurchaseInterface[]>()
    const [ isLoadingPurchases, setIsLoadingPurchases ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/purchases/get-all-by-user-id/?userId=${userId}`)
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