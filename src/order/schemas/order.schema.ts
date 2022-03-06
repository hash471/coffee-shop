import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { OrderStatus } from "../dto/base-order.dto";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    
  @Prop({ min: 0, required: true })
  total: number;

  @Prop({ type: String, required: true })
  status: OrderStatus;

  @Prop({
      type:[{quantity:{type:Number}, product:{type:mongoose.Schema.Types.ObjectId}}],
      required: true
    })
  items: { quantity: number; product: String }[];

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  orderId: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);