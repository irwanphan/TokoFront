import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchUsers = () => {
    const [ users, setUsers ] = useState()
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

export const useFetchUser = (email:any) => {
    const [ user, setUser ] = useState()
    const [ isLoadingUser, setIsLoadingUser ] = useState<boolean>(true)
    // console.log(user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/users/?email=${email}`)
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