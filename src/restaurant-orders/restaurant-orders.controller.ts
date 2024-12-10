import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from '../utils/base-controller';
import { JwtAuthnGuard } from '../authentication/jwt.guard';
import { RestaurantOrdersService } from './restaurant-orders.service';

@Controller('api/v1/restaurant-orders')
export class RestaurantOrdersController extends BaseController {
  constructor(protected readonly service: RestaurantOrdersService) {
    super(service);
  }

  @Post()
  @UseGuards(JwtAuthnGuard)
  async createRestaurantOrder(@Body() data, @Req() req) {
    return this.service.createRestaurantOrder(
      data,
      await this.getMeta({ req }),
    );
  }

  @Get('/restaurant/:restaurantId/orders')
  async getRestaurantOrders(
    @Param('restaurantId') restaurantId: string,
    @Query('status') ordersStatus: string,
    @Req() req,
  ) {
    return this.service.getRestaurantOrders(
      {
        restaurant: { id: restaurantId },
        ordersStatus,
      },
      await this.getMeta({ req }),
    );
  }

  @Get('/user/:userId/orders')
  @UseGuards(JwtAuthnGuard)
  async getUserRestaurantOrders(@Param() data, @Req() req) {
    return this.service.getUserRestaurantOrders(
      data,
      await this.getMeta({ req }),
    );
  }
  // /********************************************************************* */
  // @Get('/:id/all_menus')
  // async getRestaurantMenus(@Param('id') restaurantId: string, @Req() req) {
  //   return this.service.getRestaurantMenus(
  //     { restaurantId },
  //     await this.getMeta({ req }),
  //   );
  // }
  // @Post('/:id/menu')
  // async addRestaurantMenu(@Body() data, @Req() req) {
  //   return this.service.addRestaurantMenu(data, await this.getMeta({ req }));
  // }
  // @Patch('/:id/menu')
  // async updateRestaurantMenu(@Body() data, @Req() req) {
  //   return this.service.updateRestaurantMenu(data, await this.getMeta({ req }));
  // }
  // @Patch('/:id/menu_item')
  // async updateMenuItem(@Body() data, @Req() req) {
  //   return this.service.updateMenuItem(data, await this.getMeta({ req }));
  // }
}
