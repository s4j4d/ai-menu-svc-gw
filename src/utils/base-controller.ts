// import { SkipThrottle } from '@nestjs/throttler';
import { BaseService } from './base-service';
import { GetMeta } from './interfaces';

export abstract class BaseController {
  constructor(protected svc: BaseService) {}

  async getMeta(data: GetMeta) {
    const { req, options } = data;
    //requestId is the first thing which is borned in the tracing
    const requestId =
      req.headers['X-Request-ID'.toLowerCase()] || req.headers['X-Request-ID'];
    const correlationId =
      req.headers['X-Correlation-ID'.toLowerCase()] ||
      req.headers['X-Correlation-ID'];
    const causationId =
      req.headers['X-Causation-ID'.toLowerCase()] ||
      req.headers['X-Causation-ID'];
    let meta;
    if (options?.pagination) {
      const rawPagination = {
        offset: req?.query?.offset || req?.body?.offset,
        limit: req?.query?.limit || req?.body?.limit,
      };
      const pagination = {
        limit: Math.max(
          1,
          Math.min(1000, parseInt(rawPagination.limit?.toString() || '10', 10)),
        ),
        offset: Math.max(
          -1,
          parseInt(rawPagination.offset?.toString() || '-1', 10),
        ),
      };
      meta = {
        requestId,
        correlationId,
        causationId,
        pagination,
      };
    } else {
      meta = { requestId, correlationId, causationId };
    }

    const httpHeaders: any = {};
    if (Object.keys(httpHeaders).length > 0) {
      meta.httpHeaders = httpHeaders;
    }
    return meta;
  }
}
