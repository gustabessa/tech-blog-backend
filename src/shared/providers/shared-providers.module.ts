import { DynamicModule } from '@nestjs/common';
import { LoggerModule } from './logger';
import { EncrypterModule } from './encrypter';
import { AuthenticationModule } from './http-authentication/http-authentication.module';
import { ConfigurationModule } from 'src/core/infrastructure/bootstrap/configuration/configuration.module';

export class SharedProvidersModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: SharedProvidersModule,
      imports: [
        ConfigurationModule.register(),
        AuthenticationModule.register(),
        EncrypterModule.register(),
        LoggerModule.register(),
      ],
    };
  }
}
