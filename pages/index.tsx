import { Box, Text } from '@chakra-ui/react'
import MainLayout from '@libs/layouts/MainLayout'
import TokoCatalog from '@components/TokoCatalog'
import TokoFeatured from '@components/TokoFeatured'
import { SettingInterface } from '@interfaces//setting'
import LoadingOverlay from '@elements/LoadingOverlay'

type HomeTypes = {
  settings: SettingInterface[],
  isLoadingSettings: boolean
}

const Home = ({settings, isLoadingSettings}: HomeTypes) => {
  // console.log(isLoadingSettings)
  // console.log(settings)

  if (isLoadingSettings) {
    return (
      <MainLayout>
        <LoadingOverlay />
      </MainLayout>
    )
  }

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