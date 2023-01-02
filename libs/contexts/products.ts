import { atom } from "recoil"
import { ItemInterface } from "@libs/interfaces/storeItem"
import axios from "axios"
import { useEffect, useState } from "react"
// import { dummyItems } from '@libs/interfaces/storeItem'

export const productsState = atom({
    key: 'products',
    default: [] as ItemInterface[]
})

export async function loadProducts() {
    try {
        const getProducts:any = await axios.get('/api/products')
            .then(response => response.data)
        // const getProducts = dummyItems
        return getProducts
    }
    catch (error) {
        throw error
        // return error
    }
}

export const useFetchProducts = () => {
    const [ products, setProducts ] = useState<ItemInterface[]>()
    const [ isLoadingProducts, setIsLoadingProducts ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/products')
                setProducts(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingProducts(false)
        }
        fetchData()
    }, [])

    return {
        products,
        isLoadingProducts
    }
}
  