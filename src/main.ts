import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvService } from './infra/env/env.service';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpAdapterHost } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    snapshot: true,
  });

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: false }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(port);
}

bootstrap();
