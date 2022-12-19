import { Box, Circle, Flex, Img, Text } from "@chakra-ui/react"

const SessionProfile = ({session}:any) => {
    // console.log(session)
    return (
        <Box>
            <Flex>
                <Circle size='1.5rem' borderRadius='full' overflow='hidden' 
                    borderWidth='1px 2px 2px 1px'
                    borderStyle='solid'
                    borderColor='gray.900'
                    bgColor='gray.300'
                    mr={2}
                    >
                    <Img src={session?.user?.image!} referrerPolicy="no-referrer" />
                </Circle>
                <Text fontWeight={600}>
                    {session?.user?.name}
                </Text>
                
            </Flex>
            <Text fontSize={12}>
                {session?.user?.email}
            </Text>
        </Box>
    )
}

export default SessionProfile