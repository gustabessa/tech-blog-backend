import { DynamicModule } from '@nestjs/common';
import { LoggerModule } from './logger';
import { EncrypterModule } from './encrypter';

export class SharedProvidersModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: SharedProvidersModule,
      imports: [LoggerModule.register(), EncrypterModule.register()],
    };
  }
}
