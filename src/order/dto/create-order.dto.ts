import { BaseOrderDto, OrderStatus } from "./base-order.dto";

export interface CreateOrderDto extends BaseOrderDto {
    total :  number;
    status: OrderStatus;
}