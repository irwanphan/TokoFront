import { PurchasesInterface } from "@interfaces//purchases"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchPurchases = () => {
    // TODO: purchases type
    const [ purchases, setPurchases ] = useState<PurchasesInterface[]>()
    const [ isLoadingPurchases, setIsLoadingPurchases ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async (query:any = 'asdf') => {
            try {
                const { data: response } = await axios.get('/api/purchases', query )
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

export const useFetchPurchase = (id:any) => {
    // TODO: purchases type
    const [ purchase, setPurchase ] = useState<PurchasesInterface[]>()
    const [ isLoadingPurchase, setIsLoadingPurchase ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/purchases/?id=${id}`)
                setPurchase(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingPurchase(false)
        }
        fetchData()
    }, [])

    return {
        purchase,
        isLoadingPurchase
    }
}