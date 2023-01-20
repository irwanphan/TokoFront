import { useFetchPurchases } from "@hooks/useFetchPurchases"
import { PurchaseInterface } from "@interfaces//purchases"
import MainLayout from "@layouts//MainLayout"


const PurchasesPage = () => {

    const { purchases, isLoadingPurchases } = useFetchPurchases()

    console.log(purchases)

    return (
        <MainLayout>
            asdf
        </MainLayout>
    )
}

export default PurchasesPage