import { PurchaseInterface } from "@interfaces//purchases"
import axios from "axios"
import { useState, useEffect } from "react"
// query single purchase
export const useFetchPurchasesByUserId = (userId:any) => {
    const [ purchases, setPurchases ] = useState<PurchaseInterface[]>()
    const [ isLoadingPurchases, setIsLoadingPurchases ] = useState<boolean>(true)

    const [ qid, setQid ] = useState()

    useEffect(() => {
        userId === undefined    ? console.log('waiting ...')
                                : setQid(userId)
    }, [userId])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/purchases/get-all-by-user-id/?userId=${qid}`)
                setPurchases(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingPurchases(false)
        }
        fetchData()
    }, [qid])

    return {
        purchases,
        isLoadingPurchases
    }
}