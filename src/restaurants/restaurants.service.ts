import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../utils/base-service';
import { Metadata } from '../utils/interfaces';

@Injectable()
export class RestaurantsService extends BaseService {
  constructor(protected readonly amqpConnection: AmqpConnection) {
    super('restaurants', amqpConnection);
  }
  async addRestaurant(data: object, meta: Metadata) {
    return this.sendCommand('add_restaurant', data, meta);
  }
  async getRestaurantProfile(data: object, meta: Metadata) {
    return this.sendQuery('get_restaurant_profile', data, meta);
  }
  async setUserRestaurantPreferences(data: object, meta: Metadata) {
    return this.sendCommand('set_user_restaurant_preferences', data, meta);
  }
  async getUserRestaurantPreferences(data: object, meta: Metadata) {
    return this.sendQuery('get_user_restaurant_preferences', data, meta);
  }
  /***************************************************** */
  async getRestaurantMenus(data: object, meta: Metadata) {
    return this.sendQuery('get_restaurant_menus', data, meta);
  }
  async addRestaurantMenu(data: object, meta: Metadata) {
    return this.sendCommand('add_restaurant_menu', data, meta);
  }
  async updateRestaurantMenu(data: object, meta: Metadata) {
    return this.sendCommand('update_restaurant_menu', data, meta);
  }
  async updateMenuItem(data: object, meta: Metadata) {
    return this.sendCommand('update_menu_item', data, meta);
  }

  /***************************************************** */
  async createQuestion(data: object, meta: Metadata) {
    return this.sendCommand('create_question', data, meta);
  }

  async getAllQuestions(meta: Metadata) {
    return this.sendQuery('get_all_questions', {}, meta);
  }
}
