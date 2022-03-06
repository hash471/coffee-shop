import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Item, ItemDocument } from 'src/item/schemas/item.schema';
import { BaseOrderDto, OrderStatus } from './dto/base-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {

  constructor(@InjectModel(Order.name) private readonly repository: Model<OrderDocument>,
              @InjectModel(Item.name) private readonly itemRepository: Model<ItemDocument>) {}


  async findAll(): Promise<Order[]> {
    return await this.repository.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    return await this.repository.findById(id).exec();
  }

  async create(baseOrderDto : BaseOrderDto): Promise<Order> {

    const order : CreateOrderDto =  await this.processOrder(baseOrderDto) ;

    return await new this.repository({
      ...order,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return await this.repository.findByIdAndUpdate(id, updateOrderDto).exec();
  }

  private async processOrder( baseOrder : BaseOrderDto ) {    
    
    const order : CreateOrderDto = {
      "total" : 0,
      "status" : OrderStatus.AWAITING,
      "items" : baseOrder.items
    };

    for(let item of baseOrder.items) {
      
      try {
        let discount = 0;
        const product = await this.itemRepository.findOne({_id: item.product})
         
        if(item.quantity > product.availableQuantity) {
          order.total = 0;
          order.status = OrderStatus.CANCELLED;
          break;
        }
  
        if(product.discount){
            if(order.items.find(x => x.product === product.discountParentItem.toString())) {
              discount = product.price * (product.discount/100);
            } 
        } 
        order.total += item.quantity * ((product.price - discount) * ( 1 + product.taxRate / 100));
      } catch (error) {
        console.log("Error calculating the total for order " + error)

      }
    }
    return order;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleOrders() {
    const orders = await this.repository.find({status : OrderStatus.PENDING});
    for(let order of orders){
      order.status = OrderStatus.PREPARED
      try {
        await this.repository.findByIdAndUpdate(order.id, order).exec();
        console.log("Processed for Order: "+order.orderId);
      } catch (error) {
        console.log("error processing order:"+order.orderId+" error:"+ error)
      }
    }
  }
}
