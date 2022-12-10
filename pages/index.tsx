import { Box } from '@chakra-ui/react'
import AnchorMenuNav from '@libs/layouts/AnchorMenuNav'
import MainLayout from '@libs/layouts/MainLayout'
import CatalogFullColumn from '@units/CatalogFullColumn'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>TokoFront</title>
        <meta name="description" content="Store Front for TokoPro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <CatalogFullColumn  
        // bgColor='lightskyblue'
        title='Something Out There'
        currency='IDR'
        price={800000}
        href='/'
      >
      </CatalogFullColumn>
    </MainLayout>
  )
}
