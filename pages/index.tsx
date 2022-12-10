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

    </MainLayout>
  )
}

export default Home