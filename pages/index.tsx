import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import BlockContainer from '@elements/BlockContainer'
import MainLayout from '@libs/layouts/MainLayout'
import CatalogFullColumn from '@units/CatalogFullColumn'

const Home = () => {
  return (
    <MainLayout>
      
      <CatalogFullColumn  
        // bgColor='lightskyblue'
        title='Something Out There'
        currency='IDR'
        price={800000}
        haveButton
        buttonText='Shop Now'
        href='/'
      />

      <Box 
        textAlign='center' 
        mt={12} mb={8}>
        <Text fontSize={32}>
          Trending Now
        </Text>
        <Text fontSize={14}>
          Find the perfect piece or accessory to finish off your favorite room in the house.
        </Text>
      </Box>

      <Grid templateColumns='1fr 1fr 1fr 1fr' gap={4}>
        <GridItem>
          <BlockContainer>
            <Text fontSize={16} fontWeight={600}>
              Set Your Sight Straight
            </Text>
            <Text fontSize={12} mt={1} color='blackAlpha.800'>
              It's there
            </Text>
          </BlockContainer>
        </GridItem>
        <GridItem>
          <BlockContainer>asdf</BlockContainer>
        </GridItem>
        <GridItem>
          <BlockContainer>asdf</BlockContainer>
        </GridItem>
        <GridItem>
          <BlockContainer>asdf</BlockContainer>
        </GridItem>
      </Grid>

    </MainLayout>
  )
}

export default Home