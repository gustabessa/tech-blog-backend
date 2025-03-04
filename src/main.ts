import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ILogger } from './shared/providers/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  const port = (process.env.PORT as unknown as number) ?? 3000;
  const logger = await app.resolve(ILogger);
  await app.listen(port);

  logger.log(`Server running on port ${port}`);
}
void bootstrap();
