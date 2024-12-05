import { Global, Logger, Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make it available everywhere
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}` // Use the appropriate .env file based on NODE_ENV
        : '.env', // Default to .env if NODE_ENV is not set
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
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
      uri: 'amqp://guest:guest@localhost:5672',
      // channels: {
      //   GW: {
      //     prefetchCount: 15,
      //     default: true,
      //   },
      // },
      connectionInitOptions: { wait: false },
    }),
    RestaurantsModule,
    UsersModule,
    DocumentsModule,
    AuthenticationModule,
  ],
  providers: [Logger],
  exports: [RabbitMQModule, Logger, UsersModule],
})
export class AppModule {}
