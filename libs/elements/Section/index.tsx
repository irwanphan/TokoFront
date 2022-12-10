import { Box, FlexProps, Image } from "@chakra-ui/react"
import { ReactNode } from "react"

interface PageSectionProps extends FlexProps {
    bgImageUrl?: string
    biColor?: Array<string>
    children: ReactNode
}

const PageSection = ({bgImageUrl, biColor, children, ...rest}:PageSectionProps) => {
    return (
        <Box
            background={`url(${bgImageUrl})`}
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            bgSize={'cover'}
            alignContent={'center'}
            position={'relative'} 
            // overflow={'hidden'}
            px={{ base: 4, md: 8 }}
            py={{ base: 8 }}
            {...rest}
            w={'full'}
        >
            <Box
                maxWidth={1120} mx={"auto"}
            >
                {children}
            </Box>
        </Box>
    )
} 
export default PageSection