import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreInfrastructureModule } from './core/infrastructure/bootstrap/infrastructure.module';
import { CoreUserModule } from './core/user/bootstrap/user.module';
import { SharedProvidersModule } from './shared/providers/shared-providers.module';
import { TransformResultToHttpResponseInterceptor } from './shared/utils/result/transform-result-to-http-response.interceptor';
import { CorePostModule } from './core/post/bootstrap/post.module';

@Module({
  imports: [
    CoreInfrastructureModule.register(),
    CorePostModule.register(),
    CoreUserModule.register(),
    SharedProvidersModule.register(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResultToHttpResponseInterceptor,
    },
  ],
})
export class AppModule {}
