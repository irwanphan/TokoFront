import { Box, FlexProps, HStack, Icon, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { TbBrandReactNative, TbBrandNextjs, TbCircle, TbBrandVue, TbBrandNuxt, TbBrandAngular, TbBrandJavascript, TbBrandSass, TbBrandTailwind, TbBrandBootstrap, TbBrandCss3, TbBrandGit, TbFileSpreadsheet, TbChartDots3, TbLayoutGridAdd, TbLayoutBoardSplit, TbLayoutKanban, TbBrandFigma, TbDevices, TbBrandFirebase } from "react-icons/tb"
import { BsLightningChargeFill } from "react-icons/bs"

interface SkillBadgeContentProps extends FlexProps {
    icon: string
    color?: string
    textColor?: string
    children: ReactNode
}
interface IconMatchedProps extends FlexProps {
    icon: string
    iconColor?: string
}

export const IconMatched = ({icon, iconColor}:IconMatchedProps) => {
    const match:any = {
        "requirement"   : <TbFileSpreadsheet />,
        "project"       : <TbChartDots3 />,
        "laseau"        : <TbLayoutGridAdd />,
        "modelling"     : <TbLayoutBoardSplit />,

        "react"         : <TbBrandReactNative />,
        "nextjs"        : <TbBrandNextjs />,
        "vuejs"         : <TbBrandVue />,
        "nuxtjs"        : <TbBrandNuxt />,
        "angular"       : <TbBrandAngular />,
        "js"            : <TbBrandJavascript />,
        "sass"          : <TbBrandSass />,
        "chakraui"      : <BsLightningChargeFill />,
        "tailwind"      : <TbBrandTailwind />,
        "bootstrap"     : <TbBrandBootstrap />,
        "css"           : <TbBrandCss3 />,
        "git"           : <TbBrandGit />,
        "firebase"      : <TbBrandFirebase />,

        "wireframe"     : <TbLayoutKanban />,
        "prototype"     : <TbDevices />,
        "figma"         : <TbBrandFigma />,

        "default"       : <TbCircle />
    }
    return (
        <Box fontSize='1.75rem'
            transition='0.3s ease all'
            color={{ base: iconColor, md: 'inherit' }}
            _groupHover={{
                color: iconColor
            }}
        >
            { match[icon] || match['default'] }
        </Box>
    )
}

const SkillBadgeContent = ({icon, color, textColor, children, ...rest}:SkillBadgeContentProps) => {
    return (
        <Box {...rest}>
            <HStack>
                <IconMatched icon={icon}
                    iconColor={color}
                />
                <Text textColor={textColor ?? 'inherit'}>
                    {children}
                </Text>
            </HStack>
        </Box>
    )
}
export default SkillBadgeContent