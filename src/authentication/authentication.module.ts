import { DynamicModule, Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TokenGenerator } from './token.generator';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtAuthnGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(
          'JWT_SECRET',
          '0ae15283-7959-4bc5-b049-4d0d3487c698',
        ),
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationController,
    AuthenticationService,
    TokenGenerator,
    LocalStrategy,
    JwtAuthnGuard,
    JwtStrategy,
  ],
})
export class AuthenticationModule {
  static registerAsync(options: any): DynamicModule {
    return {
      module: AuthenticationModule,
      imports: options.imports,
      providers: [
        {
          provide: 'AUTHN_CONFIG',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
    };
  }
}
