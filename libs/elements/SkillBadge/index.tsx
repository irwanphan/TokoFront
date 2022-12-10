import { Box, Flex } from "@chakra-ui/react"
import SkillBadgeContent from "@elements/SkillBadgeContent"
import { nanoid } from "nanoid"
import { IconType } from "react-icons"

export interface SkillBadgeProps {
    id: string | number,
    icon: string,
    text: string,
    color: string,
    textColor: string
}
type SkillBadgeType = {
    skill: SkillBadgeProps
}

const SkillBadge = ({skill}: SkillBadgeType) => {
    return (
        <Flex gap={2}>
            <Box px={4} py={2} mb={1} key={nanoid()}
                borderRadius='2rem'
                borderStyle='solid'
                borderColor='gray.800'
                borderWidth='1px 2px 3px 1px'>
                <SkillBadgeContent icon={skill.icon} color={skill.color}>
                    {skill.text}
                </SkillBadgeContent>
            </Box>
        </Flex>
    )
}

export default SkillBadge