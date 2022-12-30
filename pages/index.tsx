import { Box, Text } from '@chakra-ui/react'
import MainLayout from '@libs/layouts/MainLayout'
import CatalogFullColumn from '@units/CatalogFullColumn'

import { dummyItems } from '@libs/interfaces/storeItem'
import TokoCatalog from '@libs/components/TokoCatalog'
const featuredProduct = dummyItems[3]

const Home = () => {
  
  return (
    <MainLayout>
      <CatalogFullColumn  
        bgColor='green.100'
        product={featuredProduct}
        haveButton
        buttonText='Shop Now'
      />

      <Box textAlign='center' mt={12} mb={8}>
        <Text fontSize={32}>
          Trending Now
        </Text>
        <Text fontSize={14}>
          Find the perfect piece or accessory to finish off your favorite room in the house.
        </Text>
      </Box>

      <TokoCatalog />

    </MainLayout>
  )
}

export default Home