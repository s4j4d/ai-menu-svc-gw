import { Module } from '@nestjs/common';
import { RestaurantOrdersController } from './restaurant-orders.controller';
import { RestaurantOrdersService } from './restaurant-orders.service';

@Module({
  controllers: [RestaurantOrdersController],
  providers: [RestaurantOrdersController, RestaurantOrdersService],
})
export class RestaurantOrdersModule {}
