import { WarehouseInterface } from "@interfaces//warehouses"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchWarehouses = () => {
    const [ warehouses, setWarehouses ] = useState<WarehouseInterface[]>()
    const [ isLoadingWarehouses, setIsLoadingWarehouses ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/warehouses')
                setWarehouses(response)
                // console.log ('response: ', response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingWarehouses(false)
        }
        fetchData()
    }, [])

    return {
        warehouses,
        isLoadingWarehouses
    }
}