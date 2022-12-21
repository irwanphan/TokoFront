import { Box, FlexProps, FormLabel, Input, NumberInput, NumberInputField, Textarea } from "@chakra-ui/react"
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
    value? : string | number
    placeholder?: string
    options? : optionProps[]
    icon? : IconType
    spaceAfter?: string
    isDisabled?: boolean
}

const FormInput = ({name, label, type, register, value, placeholder, options, icon, spaceAfter, isDisabled, children, ...rest}:FormInputProps) => {
    const FormInputManifest = () => {
        if (type === 'textarea') {
            return (
                <Textarea
                    {...register(name)}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    layerStyle='formInputBase'
                    // border and _hover not working on extend theme
                    borderColor='gray.900'
                    _hover={{ layerStyle: 'formInputHover' }}
                    mb={ spaceAfter ?? '2' }
                    isDisabled={isDisabled}
                />
            )
        }
        if (type === 'number') {
            return (
                <NumberInput isDisabled={isDisabled}>
                    <NumberInputField 
                        {...register(name)}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        layerStyle='formInputBase'
                        borderColor='gray.900'
                        _hover={{ layerStyle: 'formInputHover' }}
                        mb={ spaceAfter ?? '2' }
                    />
                </NumberInput>
            )
        }
        return (
            <Input type='text'
                {...register(name)}
                name={name}
                value={value}
                placeholder={placeholder}
                layerStyle='formInputBase'
                borderColor='gray.900'
                _hover={{ layerStyle: 'formInputHover' }}
                mb={ spaceAfter ?? '2' }
                isDisabled={isDisabled}
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