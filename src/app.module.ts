import { Global, Logger, Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RestaurantOrdersModule } from './restaurant-orders/restaurant-orders.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make it available everywhere
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}` // Use the appropriate .env file based on NODE_ENV
        : '.env', // Default to .env if NODE_ENV is not set
    }),
    // rabbitMQ Module
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'COMMANDS',
            type: 'direct',
          },
          {
            name: 'QUERIES',
            type: 'direct',
          },
        ],
        uri:
          'amqp://' +
          `${configService.get('RABBITMQ_USERNAME', 'guest')}:` +
          `${configService.get('RABBITMQ_PASSWORD', 'guest')}@` +
          `${configService.get('RABBITMQ_HOSTNAME', 'localhost')}:` +
          `${configService.get('RABBITMQ_PORT', '5672')}`,
        connectionInitOptions: { wait: false },
        // channels: {
        //   GW: {
        //     prefetchCount: 15,
        //     default: true,
        //   },
        // },
      }),
    }),
    RestaurantsModule,
    UsersModule,
    DocumentsModule,
    AuthenticationModule,
    RestaurantOrdersModule
  ],
  providers: [Logger],
  exports: [RabbitMQModule, Logger, UsersModule],
})
export class AppModule {}
