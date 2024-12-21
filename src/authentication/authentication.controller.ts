/* eslint-disable class-methods-use-this */
import {
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';
import { AuthGuard } from '@nestjs/passport';
// import { MetricsService } from 'com.chargoon.cloud.svc.common/dist/metrics/metrics.service';
import { ConfigService } from '@nestjs/config';
// import * as useragent from 'express-useragent';
import { stringToBoolean } from '../utils';
import { RequestType } from './interfaces/jwt-body.interface';
import { BaseController } from '..//utils/base-controller';
import { AuthenticationService } from './authentication.service';

// function getMeta(request: any) {
//   return { correlationId: request.headers['X-Correlation-ID'.toLowerCase()] };
// }

@Controller('/api/v1/auth')
export class AuthenticationController extends BaseController {
  private readonly logger = new Logger(AuthenticationController.name);

  constructor(
    // @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    protected readonly authenticationService: AuthenticationService,
    // protected readonly notificationsService: NotificationsService,
    // @Inject('IRedisService') protected readonly redisService: IRedisService,
    // protected metrics: MetricsService,
    protected configService: ConfigService,
  ) {
    super(authenticationService);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: RequestType, @Res() res: Response) {
    // const source = req.headers['user-agent'] || '';
    // const ua = useragent.parse(source);
    // const deviceType = ua.isMobile ? 'mobile' : 'desktop';

    const { access_token, user } = await this.authenticationService.loggedIn(
      req.user,
      // deviceType,
      // await this.getMeta({ req }),
    );

    res.cookie('access_token', access_token, {
      secure: stringToBoolean(
        this.configService.get('JWT_COOKIE_SECURE', 'true'),
      ),
      httpOnly: stringToBoolean(
        this.configService.get('JWT_COOKIE_HTTP_ONLY', 'true'),
      ),
      sameSite: this.configService.get('JWT_COOKIE_SAME_SITE', 'strict'),
      path: this.configService.get('JWT_COOKIE_PATH', '/'),
      domain: this.configService.get('JWT_COOKIE_DOMAIN', 'localhost')
    });
    res.status(200).send({ user });
  }
}
