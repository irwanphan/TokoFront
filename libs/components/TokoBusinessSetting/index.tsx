import { Box, Flex, Divider, FormLabel, Input, Select, Text, useToast } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { FiSettings, FiSave } from "react-icons/fi"
import { AdminSettingInterface } from "@interfaces//setting"
import { BaseSyntheticEvent, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import FormInput from "@elements/FormInput"

interface TokoBusinessSettingProps {
    settings: AdminSettingInterface | undefined
}

const TokoBusinessSetting = ({settings}:TokoBusinessSettingProps) => {
    const [ adminSettings, setAdminSettings ] = useState<AdminSettingInterface>({
        settingBusinessName: '',
        settingBusinessDescription: '',
        settingSalesOrderingModeEnable: '',
        settingMainPageMode: ''
    })

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setDisabled ] = useState(false)

    const { control, handleSubmit, register, setValue } = useForm(
        {
            defaultValues: {
                settingBusinessName: '',
                settingBusinessDescription: '',
                settingSalesOrderingModeEnable: '',
                settingMainPageMode: ''
            }
        }
    )

    const updateSetting = (data:any) => axios.post('/api/settings', data);
    const toast = useToast()
    const onSubmit: SubmitHandler<AdminSettingInterface> = async (data) => {
        setIsLoading(true)
        toast({title:'Saving...'})
        // console.log(data)
        // update data to Supabase DB
        await updateSetting(data)
        // update local session tokosettings
        sessionStorage.setItem("tokoSettings", JSON.stringify(data))
        toast({title:'Saved', status:'success'})
        setIsLoading(false)
    }

    // const handleSettingChange = (event:BaseSyntheticEvent) => {
    //     console.log(event.target.value)
    // }

    useEffect(() => {
        if (settings && settings !== undefined) {
            setAdminSettings(settings)
            setValue('settingBusinessName', settings.settingBusinessName)
            setValue('settingBusinessDescription', settings.settingBusinessDescription)
            setValue('settingMainPageMode', settings.settingMainPageMode)
            setValue('settingSalesOrderingModeEnable', settings.settingSalesOrderingModeEnable)
        }
    }, [settings])

    return (
        <BlockContainer>
            <Flex alignItems='center'>
                <Box as={FiSettings} mr={2} />
                <Text fontWeight={600} >Business Settings</Text>
            </Flex>
            <Divider />

            <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                <form>
                <Box>
                    <FormInput 
                        name='settingBusinessName'
                        label='Business Name' 
                        placeholder="eg. X-Store"
                        isDisabled={isDisabled}
                        register={register} />

                    <FormInput 
                        name='settingBusinessDescription'
                        label='Business Description' 
                        placeholder="eg. Selling Hopes & Dreams"
                        isDisabled={isDisabled}
                        register={register} />

                    <FormInput 
                        name='settingSalesOrderingModeEnable'
                        label='Sales Ordering Mode Enable'
                        type='select'
                        defaultValue={adminSettings.settingSalesOrderingModeEnable} 
                        isDisabled={isDisabled}
                        register={register}>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                    </FormInput>

                    <FormInput 
                        name='settingMainPageMode'
                        label='Main Page Mode'
                        type='select'
                        defaultValue={adminSettings.settingMainPageMode} 
                        isDisabled={isDisabled}
                        register={register}>
                        <option value='store'>Store</option>
                        <option value='sales'>Sales Ordering</option>
                    </FormInput>
                </Box>
            </form>
            </Box>

            <Flex justifyContent='right' mt={4}>
                <FormSubmitButton notLink buttonColor="orange.100"
                    onClick={handleSubmit(onSubmit)}
                >
                    <Box as={FiSave} mr={1} fontSize={20} />
                    Apply Settings
                </FormSubmitButton>
            </Flex>
        </BlockContainer>
    )
}

export default TokoBusinessSetting