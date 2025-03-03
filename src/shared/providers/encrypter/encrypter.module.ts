import { DynamicModule } from '@nestjs/common';
import { Argon2EncrypterProvider } from './argon2-encrypter';

export class EncrypterModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: EncrypterModule,
      providers: [Argon2EncrypterProvider],
      exports: [Argon2EncrypterProvider],
    };
  }
}
