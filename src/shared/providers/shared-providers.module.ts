import { DynamicModule } from '@nestjs/common';
import { LoggerModule } from './logger';

export class SharedProvidersModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: SharedProvidersModule,
      imports: [LoggerModule.register()],
    };
  }
}
