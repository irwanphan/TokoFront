import { Box, Flex, Divider, FormLabel, Input, Select, Text } from "@chakra-ui/react"
import BlockContainer from "@elements/BlockContainer"
import FormSubmitButton from "@elements/FormSubmit"
import { FiSettings, FiSave } from "react-icons/fi"
import { AdminSettingInterface } from "@interfaces//setting"
import { BaseSyntheticEvent, useEffect, useState } from "react"

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

    const handleSettingChange = (event:BaseSyntheticEvent) => {
        console.log(event.target.value)
    }

    useEffect(() => {
        if (settings && settings !== undefined) {
            setAdminSettings(settings)
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
                <Box>
                    <FormLabel>
                        Business Name
                    </FormLabel>
                    <Input value={adminSettings.settingBusinessName} />

                    <FormLabel>
                        Business Description
                    </FormLabel>
                    <Input value={adminSettings.settingBusinessDescription} />

                    <FormLabel>
                        Sales Ordering Mode Enable
                    </FormLabel>
                    <Select onChange={handleSettingChange} value={adminSettings.settingSalesOrderingModeEnable}>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                    </Select>

                    <FormLabel>
                        Main Page Mode
                    </FormLabel>
                    <Select onChange={handleSettingChange} value={adminSettings.settingMainPageMode} >
                        <option value='store'>Store</option>
                        <option value='sales'>Sales Ordering</option>
                    </Select>
                </Box>
            </Box>

            <Flex justifyContent='right' mt={4}>
                <FormSubmitButton notLink buttonColor="orange.100">
                    <Box as={FiSave} mr={1} fontSize={20} />
                    Apply Settings
                </FormSubmitButton>
            </Flex>
        </BlockContainer>
    )
}

export default TokoBusinessSetting