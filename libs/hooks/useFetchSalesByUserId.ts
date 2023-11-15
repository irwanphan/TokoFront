import { SaleInterface } from "@interfaces//sales"
import axios from "axios"
import { useState, useEffect } from "react"
// query single sale
export const useFetchSalesByUserId = (userId:any) => {
    const [ sales, setSales ] = useState<SaleInterface[]>()
    const [ isLoadingSales, setIsLoadingSales ] = useState<boolean>(true)

    const [ qid, setQid ] = useState()

    useEffect(() => {
        userId === undefined    ? console.log('waiting ...')
                                : setQid(userId)
    }, [userId])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/sales/get-all-by-user-id/?userId=${qid}`)
                setSales(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingSales(false)
        }
        fetchData()
    }, [qid])

    return {
        sales,
        isLoadingSales
    }
}