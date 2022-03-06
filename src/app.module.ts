import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { environment } from 'environment';

@Module({
  imports: [MongooseModule.forRoot(environment.mongoDBUrl), ItemModule, OrderModule,
            ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
