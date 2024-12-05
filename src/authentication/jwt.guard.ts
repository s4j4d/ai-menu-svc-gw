import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthnGuard extends AuthGuard('jwt') {
  protected readonly logger: Logger = new Logger(JwtAuthnGuard.name);

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: Error) {
    if (info) {
      this.logger.warn(info.message);
    }
    if (err || !user || user.refresh) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
