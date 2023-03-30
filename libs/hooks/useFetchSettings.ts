import { AdminSettingInterface } from "@interfaces//setting"
import { iterateAndMapSettings } from "@utils/helper"
import axios from "axios"
import { useState, useEffect } from "react"

export const useFetchSettings = () => {
    const [ settings, setSettings ] = useState<AdminSettingInterface>()
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
                    // console.log(response)
                    const newSettings = iterateAndMapSettings(response) 
                    setSettings(newSettings)
                    sessionStorage.setItem("tokoSettings", JSON.stringify(newSettings))
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