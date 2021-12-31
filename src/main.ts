import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.COOKIE_SECRET);
  app.use(
    cookieSession({
      keys: [process.env.COOKIE_SECRET],
    }),
  );

  await app.listen(3333);
}
bootstrap();
