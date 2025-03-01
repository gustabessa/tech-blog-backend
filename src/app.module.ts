import { Module } from '@nestjs/common';
import { SharedProvidersModule } from './shared/providers/shared-providers.module';
import { CoreInfrastructureModule } from './core/infrastructure/bootstrap/infrastructure.module';

@Module({
  imports: [
    CoreInfrastructureModule.register(),
    SharedProvidersModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
