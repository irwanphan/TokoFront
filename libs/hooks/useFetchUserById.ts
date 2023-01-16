import { UserInterface } from "@interfaces//users"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchUserById = (id:any) => {
    const [ user, setUser ] = useState<UserInterface>()
    const [ isLoadingUser, setIsLoadingUser ] = useState<boolean>(true)
    // console.log(user)

    useEffect(() => {
        if (id === undefined ) return
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/users/get-by-id/?id=${id}`)
                setUser(response)
                // console.log(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingUser(false)
        }
        fetchData()
    }, [id])

    return {
        user,
        isLoadingUser
    }
}