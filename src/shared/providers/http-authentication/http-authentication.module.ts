import { DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpAuthGuard } from './guards/http-auth.guard';
import { JwtAuthenticationProvider } from './jwt-http-authentication';
import { HttpAuthStrategy } from './strategies/http-auth.strategy';

const providers = [HttpAuthGuard, HttpAuthStrategy, JwtAuthenticationProvider];

export class AuthenticationModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: AuthenticationModule,
      imports: [JwtModule.register({})],
      providers,
      exports: providers,
    };
  }
}
