import { atom } from "recoil"
import { ItemInterface } from "@libs/interfaces/storeItem"
import axios from "axios"
import { useEffect, useState } from "react"
// import { dummyItems } from '@libs/interfaces/storeItem'

export const productsState = atom({
    key: 'products',
    default: [] as ItemInterface[]
})

// export async function loadProducts() {
//     try {
//         const getProducts:any = await axios.get('/api/products')
//             .then(response => response.data)
//         // const getProducts = dummyItems
//         return getProducts
//     }
//     catch (error) {
//         throw error
//         // return error
//     }
// }

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
  