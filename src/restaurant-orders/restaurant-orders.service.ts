import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../utils/base-service';
import { Metadata } from '../utils/interfaces';

@Injectable()
export class RestaurantOrdersService extends BaseService {
  constructor(protected readonly amqpConnection: AmqpConnection) {
    super('restaurant-orders', amqpConnection);
  }
  async createRestaurantOrder(data: object, meta: Metadata) {
    return this.sendCommand('create_order', data, meta);
  }
  async getRestaurantOrders(data: object, meta: Metadata) {
    return this.sendQuery('get_restaurant_orders', data, meta);
  }

  async getUserRestaurantOrders(data: object, meta: Metadata) {
    return this.sendQuery('get_user_restaurant_orders', data, meta);
  }
  // /***************************************************** */
  // async getRestaurantMenus(data: object, meta: Metadata) {
  //   return this.sendQuery('get_restaurant_menus', data, meta);
  // }
  // async addRestaurantMenu(data: object, meta: Metadata) {
  //   return this.sendCommand('add_restaurant_menu', data, meta);
  // }
  // async updateRestaurantMenu(data: object, meta: Metadata) {
  //   return this.sendCommand('update_restaurant_menu', data, meta);
  // }
  // async updateMenuItem(data: object, meta: Metadata) {
  //   return this.sendCommand('update_menu_item', data, meta);
  // }
}
