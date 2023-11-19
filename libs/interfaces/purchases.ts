export interface PurchaseInterface {
    id: number
    userId: string
    userEmail: string
    total: number
    note: string
    createdAt: Date
    updatedAt: Date
    supplierId: string | null
    shipment: PurchaseShipment | null
    detail: PurchaseDetailInterface[]
} 

export interface PurchaseShipment {
    id: number
    address: string
    city: string
    province: string
    postal: string
    purchaseId: number
    warehouseId: string
    received: boolean
    receivedBy?: string
    note: string
}

export interface PurchaseDetailInterface {
    id: number
    purchaseId: number
    productId: string
    purchasePrice: number
    qty: number
    unit: string
}