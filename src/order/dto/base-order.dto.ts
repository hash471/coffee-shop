export enum OrderStatus {
    AWAITING = "AWAITING",
    PENDING = "PENDING",
    PREPARED = "PREPARED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export interface BaseOrderDto {
    items: { quantity: number; product: String }[];
}