import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenGenerator {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async generate(userId: string, username: string) {
    const accessExpiredIn = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_MINUTES',
      '1h',
    );
    const access_token = await this.jwtService.signAsync(
      {
        id: userId,
        username,
      },
      {
        expiresIn: accessExpiredIn,
      },
    );
    return {
      access_token,
    };
  }
}
