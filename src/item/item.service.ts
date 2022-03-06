import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemService {
  
  constructor(@InjectModel(Item.name) private readonly model: Model<ItemDocument>) {}


  async findAll(): Promise<Item[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    return await this.model.findById(id).exec();
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await new this.model({
      ...createItemDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.model.findByIdAndUpdate(id, updateItemDto).exec();
  }

  async delete(id: string): Promise<Item> {
    return await this.model.findByIdAndDelete(id).exec();
  }

}
