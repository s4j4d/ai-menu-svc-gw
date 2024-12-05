import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';
import { BaseController } from '../utils/base-controller';
import { JwtAuthnGuard } from '../authentication/jwt.guard';

@Controller('/api/v1/users')
export class UsersController extends BaseController {
  constructor(protected readonly service: UsersService) {
    super(service);
  }

  @Post()
  async create(@Body() data: CreateUserDto, @Req() req) {
    return this.service.create(data, await this.getMeta({ req }));
  }
  @Get('/profile/:id')
  @UseGuards(JwtAuthnGuard)
  async getUserProfile(@Param() data, @Req() req): Promise<any> {
    if (req.user.id !== data.id) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.service.getUserProfile(data, await this.getMeta({ req }));
  }
}
