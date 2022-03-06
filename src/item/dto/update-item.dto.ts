import { BaseItemDto } from "./base-item.dto";

export interface UpdateItemDto extends BaseItemDto {
    createdAt: Date;
}