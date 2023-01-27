import { UserInterface } from "@interfaces//user"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchUsers = () => {
    const [ users, setUsers ] = useState<UserInterface[]>()
    const [ isLoadingUsers, setIsLoadingUsers ] = useState<boolean>(true)
    // console.log(users)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/users')
                setUsers(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingUsers(false)
        }
        fetchData()
    }, [])

    return {
        users,
        isLoadingUsers
    }
}