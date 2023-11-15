export interface PurchaseInterface {
    id: number
    userId: String
    userEmail: String
    total: number
    note: String
    createdAt: String
    updatedAt: String
    shipment: PurchaseShipmentInterface
    warehouseId: String
    detail: PurchaseDetailInterface[]
} 

export interface PurchaseShipmentInterface {
    id: number
    address: String
    city: String
    province: String
    postal: String
    saleId: number
}

export interface PurchaseDetailInterface {
    id: number
    saleId: number
    productId: String
    salePrice: number
    qty: number
    unit: String
}