import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Metadata } from '../../utils/interfaces';

export class CreateUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsOptional()
  password?: string;

  __meta?: Metadata;
}
