import { DynamicModule, Logger } from '@nestjs/common';
import { NestjsLoggerProvider } from './nestjs-logger';

export class LoggerModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [Logger, NestjsLoggerProvider],
      exports: [NestjsLoggerProvider],
    };
  }
}
