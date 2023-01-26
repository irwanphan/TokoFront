import { Box, Circle, Flex, Img, Text } from "@chakra-ui/react"
import { LoadingBlockList } from "@elements/LoadingBlock"

const SessionProfile = ({session}:any) => {
    // console.log(session)
    // console.log(session.user.user_metadata)
    const user = session?.user?.user_metadata

    if (session === null) {
        return (
            <LoadingBlockList />
        )
    }

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
                    <Img src={user.picture!} referrerPolicy="no-referrer" />
                </Circle>
                <Text fontWeight={600}>
                    {user.full_name}
                </Text>
                
            </Flex>
            <Text fontSize={12}>
                {user.email}
            </Text>
        </Box>
    )
}

export default SessionProfile