import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPasswordException extends HttpException {
  constructor(public message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
