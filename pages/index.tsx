import { Box, Text } from '@chakra-ui/react'
import MainLayout from '@libs/layouts/MainLayout'
import TokoCatalog from '@components/TokoCatalog'
import TokoFeatured from '@components/TokoFeatured'

const Home = () => {
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