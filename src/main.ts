import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  Logger.log('Aplicação iniciada', 'Bootstrap');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
