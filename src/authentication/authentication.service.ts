import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BaseService } from '../utils/base-service';
import { IncorrectPasswordException } from './exceptions';
import * as bcrypt from 'bcryptjs';
import { decodeBase64 } from './utils';
import { IJWTBody } from './interfaces/jwt-body.interface';
import { TokenGenerator } from './token.generator';

@Injectable()
export class AuthenticationService extends BaseService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenGenerator: TokenGenerator,
    protected readonly amqpConnection: AmqpConnection,
  ) {
    super('authn', amqpConnection);
  }

  protected readonly logger = new Logger(AuthenticationService.name);

  async validateUser(usernameOrMobile: string, pass: string): Promise<any> {
    this.logger.log(this.validateUser.name);
    let users = [];
    try {
      users =
        (
          await this.usersService.getUsersByUsernameOrMobile({
            usernameOrMobile,
          })
        )?.data ?? [];
      if (users.length === 1) {
        if (
          // !(await bcrypt.compare(
          //   decodeBase64(pass),
          //   users[0]?.passwords?.find((p) => p?.header === 'primary')?.hash,
          // ))
          users[0].password !== pass
        ) {
          throw new IncorrectPasswordException('Password incorrect.');
        }
        return {
          user: {
            id: users[0]._id,
            username: users[0]?.username,
            mobile: users[0]?.mobile,
          },
        };
      }
      if (users.length >= 2) {
        const passChecks = await Promise.all(
          users.map((u) =>
            bcrypt.compare(
              decodeBase64(pass),
              u?.passwords?.find((p) => p?.header === 'primary')?.hash,
            ),
          ),
        );
        const selectedUser = passChecks.every((v) => v)
          ? users.find((u) => u.mobile === usernameOrMobile)
          : users.find((_, i) => passChecks[i]);
        if (!selectedUser) {
          throw new IncorrectPasswordException(
            `Password is incorrect for ${usernameOrMobile}.`,
          );
        }
        return {
          user: { id: selectedUser._id, username: selectedUser.username },
        };
      }
      throw new Error(
        `No username or mobile number matches with ${usernameOrMobile}`,
      );
    } catch (e) {
      Logger.warn(e);
      return {
        error: e.message,
      };
    }
  }

  async loggedIn(
    user: IJWTBody,
    // deviceType: (typeof deviceTypeEnum)[number],
    // meta: object,
  ) {
    // try {
    // await this.usersService.setLastLogin(user, meta);
    // } catch (err) { this.logger.error(err); }
    // const deviceId = uuid4();
    // const { access_token, refresh_token } = await this.tokenGenerator.generate(
    //   user.id,
    //   user.username,
    //   deviceId,
    //   {
    //     isLogin: true,
    //     deviceType,
    //   },
    // );
    const { access_token } = await this.tokenGenerator.generate(
      user.id,
      user.username || user.mobile,
    );
    return {
      user: { id: user.id, username: user.username },
      access_token,
    };
  }
}
