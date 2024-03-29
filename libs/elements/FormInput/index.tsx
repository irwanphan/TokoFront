import { Box, FlexProps, FormLabel, Input, NumberInput, NumberInputField, Select, Textarea } from "@chakra-ui/react"
import { IconType } from "react-icons/lib";

interface optionProps {
    id: string
    image?: string
    value?: string | number
    label: string
}
interface FormInputProps extends FlexProps {
    name: string
    label? : string
    type? : string
    register: any
    autoFocus?: boolean
    value? : string | number
    defaultValue? : string | number
    placeholder?: string
    options? : optionProps[]
    icon? : IconType
    spaceAfter?: string
    isDisabled?: boolean
    isReadOnly?: boolean
}

const FormInput = ({name, label, type, register, autoFocus, value, defaultValue, placeholder, options, icon, spaceAfter, isDisabled, isReadOnly, children, ...rest}:FormInputProps) => {
    const FormInputManifest = () => {
        if (type === 'textarea') {
            return (
                <Textarea
                    {...register(name)}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    layerStyle='formInputBase'
                    // border and _hover not working on extend theme
                    borderColor='gray.900'
                    _hover={{ layerStyle: 'formInputHover' }}
                    mb={ spaceAfter ?? '2' }
                    isDisabled={isDisabled}
                    isReadOnly={isReadOnly}
                    autoFocus={autoFocus}
                />
            )
        }
        if (type === 'number') {
            return (
                <NumberInput isDisabled={isDisabled} isReadOnly={isReadOnly}>
                    <NumberInputField 
                        {...register(name)}
                        name={name}
                        value={value}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        layerStyle='formInputBase'
                        borderColor='gray.900'
                        _hover={{ layerStyle: 'formInputHover' }}
                        mb={ spaceAfter ?? '2' }
                        autoFocus={autoFocus}
                    />
                </NumberInput>
            )
        }
        if (type === 'select') {
            return (
                <Select
                    {...register(name)}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    layerStyle='formInputBase'
                    borderColor='gray.900'
                    _hover={{ layerStyle: 'formInputHover' }}
                    mb={ spaceAfter ?? '2' }
                    autoFocus={autoFocus}
                    isDisabled={isDisabled}
                    isReadOnly={isReadOnly}
                >
                    {children}
                </Select>
            )
        }
        return (
            <Input type='text'
                {...register(name)}
                name={name}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                layerStyle='formInputBase'
                borderColor='gray.900'
                _hover={{ layerStyle: 'formInputHover' }}
                mb={ spaceAfter ?? '2' }
                autoFocus={autoFocus}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
            />
        )
    }

    return (
        <Box {...rest}>
            <FormLabel
                position='relative'
                display='inline-block'
                fontSize={14}
                px={2}
                textTransform='capitalize'
            >
                {label}
            </FormLabel>
            <FormInputManifest />
            
        </Box>
    )
}

export default FormInput