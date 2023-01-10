export interface PurchasesInterface {
    id: number
    userId: String
    userEmail: String
    total: number
    note: String
    createdAt: String
    updatedAt: String
    shipment: PurchaseShipmentInterface
    detail: PurchaseDetailInterface[]
} 

export interface PurchaseShipmentInterface {
    id: number
    address: String
    city: String
    province: String
    postal: String
    purchaseId: number
}

export interface PurchaseDetailInterface {
    id: number
    purchaseId: number
    productId: String
    purchasePrice: number
    qty: number
    unit: String
}