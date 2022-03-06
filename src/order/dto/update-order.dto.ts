import { OrderStatus } from "./base-order.dto";
import { CreateOrderDto } from "./create-order.dto";

export interface UpdateOrderDto extends CreateOrderDto {
    createdAt: Date;
} 