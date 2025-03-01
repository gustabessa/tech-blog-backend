import { Module } from '@nestjs/common';
import { SharedProvidersModule } from './shared/providers/shared-providers.module';

@Module({
  imports: [SharedProvidersModule.register()],
  controllers: [],
  providers: [],
})
export class AppModule {}
