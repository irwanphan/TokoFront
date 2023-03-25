import { UserInterface } from "@interfaces//user"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchUsers = () => {
    const [ settings, setSettings ] = useState<UserInterface[]>()
    const [ isLoadingUsers, setIsLoadingUsers ] = useState<boolean>(true)
    // console.log(settings)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/settings')
                setSettings(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingUsers(false)
        }
        fetchData()
    }, [])

    return {
        settings,
        isLoadingUsers
    }
}