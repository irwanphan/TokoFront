import { Box, FlexProps } from "@chakra-ui/react"
import TokoFooter from "@libs/components/TokoFooter"
import AnchorMenuNav from "../AnchorMenuNav"
import CustomHeader from "../CustomHeader"

const MainLayout = ({children, ...rest}: FlexProps) => {
    return (
        <Box
            bgColor='blue.50'
            minHeight='100vh'
            px={{base:'1rem', sm:'2rem', md:'4rem'}}
            {...rest}
        >
            <CustomHeader />
            <AnchorMenuNav/>

            {children}

            <TokoFooter />
        </Box>
    )
}


export default MainLayout