import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';

const logger = new Logger();
export const QRpc =
  (module: string, domain: string, command: string): MethodDecorator =>
  (target: any, key: any, descriptor: any) => {
    RabbitRPC({
      exchange: 'QUERIES',
      routingKey: `queries.${domain}.${command}`,
      queue: `${domain}_queries__${module}__${command}`,
      queueOptions: { durable: false },
      errorHandler: (channel: any, msg: any, error: any) => {
        logger.error(error.message);
      },
    })(target, key, descriptor);
  };
