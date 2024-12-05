import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { BaseService } from '../utils/base-service';
import { Metadata } from '../utils/interfaces';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class UsersService extends BaseService {
  constructor(protected readonly amqpconnection: AmqpConnection) {
    super('users', amqpconnection);
  }
  async login(data: CreateUserDto, meta: any) {
    return this.sendCommand('login_user', data, meta);
  }
  async create(data: CreateUserDto, meta: Metadata) {
    return this.sendCommand('create_user', data, meta);
  }
  async getUserProfile(data, meta: Metadata) {
    return this.sendQuery('get_user_profile', data, meta);
  }
  async getUsersByUsernameOrMobile(data) {
    return this.sendQuery('get_users_by_username_or_mobile', data, {});
  }
}
