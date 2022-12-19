import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import BlockContainer, { BlockContainerLink } from '@elements/BlockContainer'
import MainLayout from '@libs/layouts/MainLayout'
import CatalogFullColumn from '@units/CatalogFullColumn'
import NextLink from 'next/link'

import { dummyItems, ItemInterface } from '@libs/interfaces/storeItem'
const featuredProduct = dummyItems[3]

import { useSession, signIn, signOut } from "next-auth/react"

const Home = () => {
  const { data: session } = useSession()
  return (
    <MainLayout>
{/*       
      { (session) ? (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )
       : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )
      } */}


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

      <Grid templateColumns={{base: '1fr', sm:'1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr'}} gap={4}>
        {dummyItems.map((item:ItemInterface) => {
          return (
            <GridItem key={item.id}>
              <BlockContainerLink href={`/products/${item.id}`} 
                product={item}
                // bgColor='green.50'
              />
            </GridItem>
          )
        })}
      </Grid>

    </MainLayout>
  )
}

export default Home