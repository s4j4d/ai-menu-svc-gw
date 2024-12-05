import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

export class BaseService {
  constructor(
    protected readonly domain: string,
    protected readonly amqpConnection: AmqpConnection,
  ) {}

  protected readonly logger: Logger = new Logger(BaseService.name);

  async sendCommand(
    cmd: string,
    data: object,
    meta: any,
    includeMeta?: boolean,
  ): Promise<object> {
    const cid = meta?.correlationId || uuid4();
    this.logger.verbose(`cmd-snd ${cmd} ${cid}`);
    const result = await this.amqpConnection.request<object>({
      exchange: 'COMMANDS',
      routingKey: `commands.${this.domain}.${cmd}`,
      payload: includeMeta ? { ...data, __meta: meta } : data,
      correlationId: cid,
    });
    this.logger.verbose(`cmd-rcv ${cmd} ${cid}`);
    return result;
  }

  async sendQuery(
    query: string,
    data: any,
    meta: any,
    includeMeta?: boolean,
  ): Promise<any> {
    return this.sendFqq(
      `queries.${this.domain}.${query}`,
      data,
      meta,
      includeMeta,
    );
  }

  async sendFqq(
    fqq: string,
    data: any,
    meta: any,
    includeMeta?: boolean,
  ): Promise<any> {
    const cid = meta?.correlationId || uuid4();
    this.logger.verbose(`qry-snd ${fqq} ${cid}`);
    const result = await this.amqpConnection.request<object>({
      exchange: 'QUERIES',
      routingKey: fqq,
      payload: includeMeta ? { ...data, __meta: meta } : data,
      correlationId: meta?.correlationId || uuid4(),
    });
    this.logger.verbose(`qry-rcv ${fqq} ${cid}`);
    return result;
  }

  async sendFqc(
    fqq: string,
    data: any,
    meta: any,
    includeMeta?: boolean,
  ): Promise<any> {
    const cid = meta?.correlationId || uuid4();
    this.logger.verbose(`cmd-snd ${fqq} ${cid}`);
    const result = await this.amqpConnection.request<object>({
      exchange: 'COMMANDS',
      routingKey: fqq,
      payload: includeMeta ? { ...data, __meta: meta } : data,
      correlationId: meta?.correlationId || uuid4(),
    });
    this.logger.verbose(`cmd-rcv ${fqq} ${cid}`);
    return result;
  }
}
