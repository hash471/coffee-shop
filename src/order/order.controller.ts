import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseOrderDto, OrderStatus } from './dto/base-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';

@Controller('order')
export class OrderController {
  
  constructor(private readonly service: OrderService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() baseOrderDto: BaseOrderDto) {
      
    return await this.service.create(baseOrderDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    await this.service.update(id, updateOrderDto);
  }

}
