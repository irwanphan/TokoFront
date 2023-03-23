import { ItemInterface } from "@interfaces//storeItem"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchCatalogSearch = (param:string) => {
    const [ catalogSearch, setCatalogSearch ] = useState<ItemInterface[]>()
    const [ isLoadingCatalogSearch, setIsLoadingCatalogSearch ] = useState<boolean>(true)
    // console.log(catalog)
    const [ keyword, setKeyword ] = useState<string|undefined>()

    useEffect(() => {
        keyword === undefined   ? console.log('waiting ...')
                                : setKeyword(param)
    }, [param])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/products/get-products-by-keyword/?keyword=${keyword}`)
                setCatalogSearch(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingCatalogSearch(false)
        }
        fetchData()
    }, [])

    return {
        catalogSearch,
        isLoadingCatalogSearch
    }
}