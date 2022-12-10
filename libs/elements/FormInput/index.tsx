import { Box, Flex, FlexProps, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Textarea } from "@chakra-ui/react"
// import {
//     AutoComplete,
//     AutoCompleteInput,
//     AutoCompleteItem,
//     AutoCompleteList,
//     AutoCompleteTag,
// } from "@choc-ui/chakra-autocomplete";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { FiList } from "react-icons/fi";
import { IconType } from "react-icons/lib";

interface optionProps {
    id: string
    image?: string
    value?: string
    label: string
}
interface FormInputProps extends FlexProps {
    name: string
    label? : string
    type? : string
    register: any
    value? : string | number
    options? : optionProps[]
    icon? : IconType
    spaceAfter?: string
    disabled?: boolean
}

const FormInput = ({name, label, type, register, value, options, icon, spaceAfter, disabled, children, ...rest}:FormInputProps) => {
    // const { setValue } = useForm()
    const [ data, setData ] = useState('')
    
    // useEffect(() => {
    //     console.log(register)
    // }, [data])

    const FormInputManifest = () => {
        // if (type === 'selection') {
        //     return (
        //         <AutoComplete 
        //             onChange={async (vals) => {
        //                 try {
        //                     console.log('value:', vals)
        //                     console.log('name:', name)
        //                     await setData(vals)
        //                     console.log(data)
        //                 }
        //                 catch (e) {
        //                     console.log(e)
        //                 }
        //             }}
        //             rollNavigation>
        //             <Input 
        //                 // hidden 
        //                 // readOnly
        //                 {...register(name)}
        //                 name={name}
        //                 type="text"
        //                 value={data} 
        //             />
        //             <InputGroup mb={ spaceAfter ?? '2' } >
        //                 <InputLeftElement
        //                     pointerEvents="none"
        //                     color="inherit"
        //                     fontSize="1.2em">
        //                     <Box as={icon ?? FiList} />
        //                 </InputLeftElement>
        //                 <AutoCompleteInput variant="filled" placeholder="Search..." 
        //                     value={value}
        //                     borderColor='gray.900'
        //                     layerStyle='formInputBase'
        //                     _hover={{ layerStyle: 'formInputHover' }}
        //                     _focus={{ layerStyle: 'formInputFocus', bgGradient: 'linear(to-r, whiteAlpha.900 70%, yellow.300)' }}
        //                 />
        //             </InputGroup>
        //             <AutoCompleteList p={0} mt={0}>
        //                 <Box border='1px solid black'
        //                     borderRadius='0.5rem'
        //                     position='relative'
        //                     >
        //                     {options!.map((option, oid) => (
        //                         <AutoCompleteItem
        //                         key={`option-${oid}`}
        //                         value={option.label}
        //                         _selected={{ bg: "transparent" }}
        //                         _focus={{ bg: "transparent", textDecoration: "underline" }}
        //                         _hover={{ bg: "transparent", textDecoration: "underline" }}
        //                         >
        //                             {option.label}
        //                         </AutoCompleteItem>
        //                     ))}
        //                 </Box>
        //             </AutoCompleteList>
        //         </AutoComplete>
        //     )
        // }
        // if (type === 'multitags') {
        //     return (
        //         <Flex layerStyle={'formInputBase'} 
        //             role="group"
        //             borderColor='gray.900'
        //             _hover={{ layerStyle: 'formInputHover' }}
        //             w="full" direction="column"
        //             mb={ spaceAfter ?? '2' }
        //             >
        //             <FormControl id="email">
        //                 <AutoComplete 
        //                     openOnFocus 
        //                     multiple 
        //                     onChange={vals => console.log(vals)}
        //                     >
        //                     <AutoCompleteInput 
        //                         name={name}
        //                         _groupFocus={{ layerStyle: 'formInputHover' }}
        //                         variant="filled"
        //                         bgColor='transparent'
        //                         color='transparent'
        //                         _hover={{ bg:"transparent" }}
        //                         _focus={{ color:"black" }}
        //                         px={2}
        //                     >
        //                         {({ tags }) =>
        //                             tags.map((tag, tid) => (
        //                                 <AutoCompleteTag
        //                                     key={tid}
        //                                     label={tag.label}
        //                                     onRemove={tag.onRemove}
        //                                     border='1px solid black'
        //                                     bgColor='blue.100'
        //                                 />
        //                             ))
        //                         }
        //                     </AutoCompleteInput>
        //                     <AutoCompleteList p={0} mt={0}>
        //                         <Box border='1px solid black'
        //                             borderRadius='0.5rem'
        //                             position='relative'
        //                         >
        //                             {options!.map((option, oid) => (
        //                                 <AutoCompleteItem
        //                                     key={`option-${oid}`}
        //                                     value={option.label}
        //                                     textTransform="capitalize"
        //                                     _selected={{ bg: "transparent" }}
        //                                     _focus={{ bg: "transparent" }}
        //                                     _hover={{ bg: "transparent" }}
        //                                     >
        //                                     {option.label}
        //                                 </AutoCompleteItem>
        //                             ))}
        //                         </Box>
        //                     </AutoCompleteList>
        //                 </AutoComplete>
        //             </FormControl>
        //         </Flex>
        //     )
        // }
        if (type === 'textarea') {
            return (
                <Textarea
                    {...register(name)}
                    name={name}
                    value={value}
                    layerStyle='formInputBase'
                    // border and _hover not working on extend theme
                    borderColor='gray.900'
                    _hover={{ layerStyle: 'formInputHover' }}
                    mb={ spaceAfter ?? '2' }
                    isDisabled={disabled}
                />
            )
        }
        return (
            <Input type='text'
                {...register(name)}
                name={name}
                value={value}
                layerStyle='formInputBase'
                borderColor='gray.900'
                _hover={{ layerStyle: 'formInputHover' }}
                mb={ spaceAfter ?? '2' }
                isDisabled={disabled}
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