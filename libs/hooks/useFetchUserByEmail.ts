import { UserInterface } from "@interfaces//user"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchUser = (email:any) => {
    const [ user, setUser ] = useState<UserInterface>()
    const [ isLoadingUser, setIsLoadingUser ] = useState<boolean>(true)
    // console.log(user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/users/get-by-email/?email=${email}`)
                setUser(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingUser(false)
        }
        fetchData()
    }, [])

    return {
        user,
        isLoadingUser
    }
}