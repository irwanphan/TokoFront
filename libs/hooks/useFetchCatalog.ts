import { ItemInterface } from "@interfaces//storeItem"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchCatalog = () => {
    const [ catalog, setCatalog ] = useState<ItemInterface[]>()
    const [ isLoadingCatalog, setIsLoadingCatalog ] = useState<boolean>(true)
    // console.log(catalog)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/products')
                setCatalog(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingCatalog(false)
        }
        fetchData()
    }, [])

    return {
        catalog,
        isLoadingCatalog
    }
}