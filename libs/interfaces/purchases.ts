export interface PurchaseInterface {
    id: number
    userId: string
    userEmail: string
    total: number
    note: string
    createdAt: string
    updatedAt: string
    supplierId?: string
    shipment: PurchaseShipmentInterface
    detail: PurchaseDetailInterface[]
} 

export interface PurchaseShipmentInterface {
    id: number
    address: string
    city: string
    province: string
    postal: string
    purchaseId: number
    warehouseId: string
    received?: boolean
    receivedBy?: string
    note?: string
}

export interface PurchaseDetailInterface {
    id: number
    purchaseId: number
    productId: string
    purchasePrice: number
    qty: number
    unit: string
}