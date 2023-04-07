import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

const Link: ComponentStyleConfig = {
    baseStyle: {
        borderColor:'gray.900',
        _hover: {
            textDecoration: 'none'
        },
        _focus: {
            textDecoration: 'none',
            boxShadow: 'none',
            color: 'purple.800'
        }
    },
}
const Input: ComponentStyleConfig = {
    defaultProps: {
        colorScheme: 'yellow',
        variant: 'outline'
    },
    baseStyle: {
        bgColor: 'whiteAlpha.900'
    },
    variants: {
        outline: {
            field: {
                borderColor: 'gray.900',
                _focusVisible: { boxShadow: '0 0 0 1px yellow.500' },
                _hover: { borderColor: 'gray.900' }
            }
        }
    }
}
const Select: ComponentStyleConfig = {
    defaultProps: {
        colorScheme: 'yellow',
        variant: 'outline'
    },
    baseStyle: {
        bgColor: 'whiteAlpha.900'
    },
    variants: {
        outline: {
            field: {
                borderColor: 'gray.900',
                _focusVisible: { boxShadow: '0 0 0 1px yellow.500' },
                _hover: { borderColor: 'gray.900' }
            }
        }
    }
}
const Textarea: ComponentStyleConfig = {
    defaultProps: {
        colorScheme: 'yellow',
        variant: 'outline'
    },
    baseStyle: {
        bgColor: 'whiteAlpha.900'
    },
    variants: {
        outline: {
            field: {
                borderColor: 'gray.900',
                _focusVisible: { boxShadow: '0 0 0 1px yellow.500' },
                _hover: { borderColor: 'gray.900' }
            }
        }
    }
}
const Divider: ComponentStyleConfig = {
    baseStyle: {
        my: '2',
        borderColor: 'gray.700',
        borderWidth: '2px'
    }
}
const Checkbox: ComponentStyleConfig = {
    baseStyle: {
        control: {
            // borderColor: 'gray.500',
            borderRadius: '4',
            bg: 'whiteAlpha.900'
        }
    },
    defaultProps: {
        colorScheme: 'yellow'
    }
}
const FormLabel: ComponentStyleConfig = {
    baseStyle: {
        mx: '0',
        my: '0',
        lineHeight: 8 // experimental, check later
    }
}

const theme = extendTheme({
    fonts: {
        heading: 'Montserrat, Verdana, Century Gothic, Arial Nova, Open Sans, Segoe UI, Roboto',
        body: 'Montserrat, Verdana, Century Gothic, Arial Nova, Open Sans, Segoe UI, Roboto',
    },

    components: {
        Link,
        Divider,
        Checkbox,
        Input,
        Select,
        FormLabel,
        Textarea
    },

    breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '70em',
        '2xl': '96em',
    },

    layerStyles: {
        formInputBase: {
            borderStyle: 'solid',
            borderTopWidth: '1px',
            borderLeftWidth: '1px',
            borderRightWidth: '2px',
            borderBottomWidth: '2px',
            borderRadius: '.25rem',
            background: 'whiteAlpha.900',
            transition: '.3s ease all',
            bgGradient: 'linear(to-r, whiteAlpha.900 70%, yellow.300)',
            bgSize: '128%',
            // shadow: 'md',
            px: 2,
            borderColor: 'gray.900',
            _focus: {
                borderTopWidth: '1px',
                borderLeftWidth: '1px',
                borderRightWidth: '2px',
                borderBottomWidth: '2px',
                borderColor: 'gray.900',
                bgSize:'100%'
            },
            _focusVisible: {
                borderWidth: 'none',
                dropShadow: 0
            }
        },
        formInputHover: {
            borderColor: 'gray.900',
            bgSize:'100%',
            shadow: 'lg'
        },
        formInputFocus: {
            borderColor: 'gray.900',
            bgSize:'100%'
        },
        formSubmitButtonBase: {
            borderStyle: 'solid',
            borderTopWidth: '1px',
            borderLeftWidth: '1px',
            borderRightWidth: '2px',
            borderBottomWidth: '3px',
            borderRadius: '.25rem',
            transition: '.3s ease all',
            bgGradient: 'linear(108deg, yellow.100 10%, yellow.300 60%, whiteAlpha.800 65%, yellow.300)',
            bgSize: '250%',
            shadow: 'md',
            px: 2,
            borderColor: 'gray.900',
            _focus: {
                borderTopWidth: '1px',
                borderLeftWidth: '1px',
                borderRightWidth: '2px',
                borderBottomWidth: '3px',
                borderColor: 'gray.900',
                bgSize:'100%'
            }
        },
        formSubmitButtonHover: {
            borderColor: 'gray.900',
            bgSize:'100%',
            shadow: 'lg'
        }
    }
})

export default theme