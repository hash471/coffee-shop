import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Item, ItemSchema } from 'src/item/schemas/item.schema';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports :[
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        useFactory: (connection: Connection) => {
          const AutoIncrement = AutoIncrementFactory(connection);
          const schema = OrderSchema;
          schema.plugin(AutoIncrement, {
            inc_field: 'orderId',
            start_seq: 1
          });

          return schema;
        },
        inject: [getConnectionToken()]
      },
    ])
  ],
})
export class OrderModule {}
