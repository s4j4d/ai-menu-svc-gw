import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';

const logger = new Logger();
export const CRpc =
  (domain: string, module: string, command: string): MethodDecorator =>
  (target: any, key: any, descriptor: any) => {
    RabbitRPC({
      exchange: 'COMMANDS',
      routingKey: `commands.${domain}.${command}`,
      queue: `${domain}_commands__${module}__${command}`,
      queueOptions: { durable: false },
      errorHandler: (channel: any, msg: any, error: any) => {
        logger.error(error.message);
      },
    })(target, key, descriptor);
  };
