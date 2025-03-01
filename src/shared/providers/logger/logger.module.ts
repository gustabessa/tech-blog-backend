import { DynamicModule } from '@nestjs/common';
import { NestjsLoggerProvider } from './nestjs-logger';

export class LoggerModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [NestjsLoggerProvider],
      exports: [NestjsLoggerProvider],
    };
  }
}
