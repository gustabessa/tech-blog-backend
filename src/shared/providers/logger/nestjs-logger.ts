import { Injectable, Logger, Provider } from '@nestjs/common';
import { ILogger } from './logger.interface';

@Injectable()
export class NestjsLogger implements ILogger {
  constructor(private readonly logger: Logger) {}

  log(message: string): void {
    return this.logger.log(message);
  }

  error(message: string): void {
    return this.logger.error(message);
  }

  warn(message: string): void {
    return this.logger.warn(message);
  }
}

export const NestjsLoggerProvider: Provider<ILogger> = {
  provide: ILogger,
  useClass: NestjsLogger,
};
