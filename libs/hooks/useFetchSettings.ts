import { SettingInterface } from "@interfaces//setting"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchSettings = () => {
    const [ settings, setSettings ] = useState<SettingInterface[]>()
    const [ isLoadingSettings, setIsLoadingSettings ] = useState<boolean>(true)
    // console.log(settings)

    useEffect(() => {
        const storedSettings = window.sessionStorage.getItem('tokoSettings')
        if (storedSettings) {
            setSettings(JSON.parse(storedSettings))
            setIsLoadingSettings(false)
        } else {
            const fetchData = async () => {
                try {
                    const { data: response } = await axios.get('/api/settings')
                    setSettings(response)
                    sessionStorage.setItem("tokoSettings", JSON.stringify(response))
                } catch (error) {
                    console.log(error)
                }
                setIsLoadingSettings(false)
            }
            fetchData()
        }
    }, [])

    return {
        settings,
        isLoadingSettings
    }
}