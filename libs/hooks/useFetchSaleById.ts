import { SaleInterface } from "@interfaces//sales"
import axios from "axios"
import { useState, useEffect } from "react"
// query single sale
export const useFetchSaleById = (id:any) => {
    const [ sale, setSale ] = useState<SaleInterface>()
    const [ isLoadingSale, setIsLoadingSale ] = useState<boolean>(true)

    const [ qid, setQid ] = useState()

    useEffect(() => {
        id === undefined    ? console.log('waiting ...')
                            : setQid(id)
    }, [id])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/sales/get-by-id/?id=${qid}`)
                setSale(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingSale(false)
        }
        fetchData()
    }, [qid])

    return {
        sale,
        isLoadingSale
    }
}