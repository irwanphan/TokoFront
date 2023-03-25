import { SettingInterface } from "@interfaces//setting"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchSettings = () => {
    const [ settings, setSettings ] = useState<SettingInterface[]>()
    const [ isLoadingSettings, setIsLoadingSettings ] = useState<boolean>(true)
    // console.log(settings)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/api/settings')
                setSettings(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoadingSettings(false)
        }
        fetchData()
    }, [])

    return {
        settings,
        isLoadingSettings
    }
}