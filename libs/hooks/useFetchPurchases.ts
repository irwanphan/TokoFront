import { ItemInterface } from "@interfaces//storeItem"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchPurchases = () => {
    const [ purchases, setPurchases ] = useState()
    const [ isLoadingPurchases, setIsLoadingPurchases ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/purchases')
                // console.log(response)
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