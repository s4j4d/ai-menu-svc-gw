import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //TODO: remove this later
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', true);
  app.use(cookieParser());
  app.use(passport.initialize());
  await app.listen(process.env.PORT ?? 3000);
  logger.verbose(`GW service listening on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
