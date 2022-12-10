import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import BlockContainer, { BlockContainerLink } from '@elements/BlockContainer'
import MainLayout from '@libs/layouts/MainLayout'
import CatalogFullColumn from '@units/CatalogFullColumn'
import NextLink from 'next/link'

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

      <Box textAlign='center' mt={12} mb={8}>
        <Text fontSize={32}>
          Trending Now
        </Text>
        <Text fontSize={14}>
          Find the perfect piece or accessory to finish off your favorite room in the house.
        </Text>
      </Box>

      <Grid templateColumns='1fr 1fr 1fr 1fr' gap={4}>
        <GridItem>
          <BlockContainerLink href='/' 
            title='Set Your Sight Straight'
            description={`It's right there`}
            bgColor='green.50'
          />
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