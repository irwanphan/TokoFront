export interface SaleInterface {
    id: number
    userId: String
    userEmail: String
    total: number
    note: String
    createdAt: String
    updatedAt: String
    shipment: SaleShipmentInterface
    detail: SaleDetailInterface[]
} 

export interface SaleShipmentInterface {
    id: number
    address: String
    city: String
    province: String
    postal: String
    saleId: number
}

export interface SaleDetailInterface {
    id: number
    saleId: number
    productId: String
    salePrice: number
    qty: number
    unit: String
}