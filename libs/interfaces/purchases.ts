export interface PurchaseInterface {
    id: number
    userId: String
    userEmail: String
    total: number
    note: String
    createdAt: String
    updatedAt: String
    supplierId?: String
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
    warehouseId: String
    received: boolean
    receivedBy?: String
    note?: String
}

export interface PurchaseDetailInterface {
    id: number
    purchaseId: number
    productId: String
    purchasePrice: number
    qty: number
    unit: String
}