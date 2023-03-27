import { Button } from "@chakra-ui/react"
import { SettingInterface } from "@interfaces//setting"

const check = (itemState:any) => {
    console.log(itemState)
}
export const checkState = (item:Object|Array<Object>) => {
    return (
        <Button
            position='fixed' right={4} bottom={4} zIndex={11}
            colorScheme='orange' variant='outline' bg='white' borderWidth={2}
            onClick={() => check(item)}
        >State!</Button>
    )
}

export const iterateAndMapSettings = (param:any) => {
    const updateSettings:any = {}
    param.forEach((item:SettingInterface) => {
        updateSettings[`${item.name}`] = item.value
    })
    return(updateSettings)
}