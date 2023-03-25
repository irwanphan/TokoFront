import { Box, Text } from '@chakra-ui/react'
import MainLayout from '@libs/layouts/MainLayout'
import TokoCatalog from '@components/TokoCatalog'
import TokoFeatured from '@components/TokoFeatured'
import { useFetchSettings } from '@hooks/useFetchSettings'
import { useEffect, useState } from 'react'
import { SettingInterface } from '@interfaces//setting'

const Home = () => {
  const [ tokoSettings, setTokoSettings ] = useState<SettingInterface[]>()
  const [ haveCurrentSettings, setHaveCurrentSettings ] = useState<boolean>(false)

  useEffect(() => {
    const currentSettings:any = localStorage.getItem("tokoSettings")
    if (currentSettings) setHaveCurrentSettings(true)
    console.log(JSON.parse(currentSettings))
  },[])

  const getSettings = () => {
    const { settings, isLoadingSettings } = useFetchSettings()
    if (!tokoSettings) {
      if (!isLoadingSettings) {
        setTokoSettings(settings)
      }
    }
  }
  getSettings()

  useEffect(() => {
    console.log(tokoSettings)
    localStorage.setItem("tokoSettings", JSON.stringify(tokoSettings))
  },[tokoSettings])

  return (
    <MainLayout>
      <TokoFeatured />

      <Box textAlign='center' mt={12} mb={8}>
        <Text fontSize={32}>
          Trending Now
        </Text>
        <Text fontSize={14}>
          Find the perfect piece or accessory to finish off your favorite room in the house.
        </Text>
      </Box>

      <TokoCatalog isTrending />

      <Box textAlign='center' mt={12} mb={8}>
        <Text fontSize={32}>
          All Products
        </Text>
      </Box>

      <TokoCatalog />

    </MainLayout>
  )
}

export default Home