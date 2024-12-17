import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

/**
 * this God forsaken class also does the input validation for us so if you don't
 * send the sepcific fields of username and password or send different ones you are
 * smashed into unauthorized wall
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  logger = new Logger(LocalStrategy.name);
  constructor(private readonly authenticationService: AuthenticationService) {
    super({ usernameField: 'usernameOrMobile', passwordField: 'password' });
  }
  async validate(usernameOrMobile: string, password: string) {
    this.logger.log(this.validate.name);
    const { user } = await this.authenticationService.validateUser(
      usernameOrMobile,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Incorrect username, mobile or password');
    }
    return user;
  }
}
