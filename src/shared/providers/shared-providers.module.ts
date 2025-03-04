import { DynamicModule } from '@nestjs/common';
import { ConfigurationModule } from 'src/core/infrastructure/bootstrap/configuration/configuration.module';
import { EncrypterModule } from './encrypter';
import { AuthenticationModule } from './http-authentication/http-authentication.module';
import { LoggerModule } from './logger';

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
