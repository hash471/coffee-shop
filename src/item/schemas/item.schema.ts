import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ItemType } from '../dto/base-item.dto';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ minlength: 3 , required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ min: 0, required: true })
  price: number;

  @Prop({ min: 0, required: true })
  taxRate: number;

  @Prop({ type: String , required: true })
  category: ItemType;

  @Prop({ min:0 , required: true })
  availableQuantity: number;

  @Prop()
  discount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId})
  discountParentItem: String;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);