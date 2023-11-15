import { useFetchSales } from "@hooks/useFetchSales"
import { SaleInterface } from "@interfaces//sales"
import MainLayout from "@layouts//MainLayout"


const SalesPage = () => {

    const { sales, isLoadingSales } = useFetchSales()

    console.log(sales)

    return (
        <MainLayout>
            asdf
        </MainLayout>
    )
}

export default SalesPage