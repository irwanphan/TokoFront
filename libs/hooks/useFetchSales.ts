import { SaleInterface } from "@interfaces//sales"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchSales = () => {
    const [ sales, setSales ] = useState<SaleInterface[]>()
    const [ isLoadingSales, setIsLoadingSales ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/sales')
                setSales(response)
                // console.log ('response: ', response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingSales(false)
        }
        fetchData()
    }, [])

    return {
        sales,
        isLoadingSales
    }
}