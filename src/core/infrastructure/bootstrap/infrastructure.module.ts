import { DynamicModule } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';

export class CoreInfrastructureModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: CoreInfrastructureModule,
      imports: [ConfigurationModule.register(), DatabaseModule.register()],
    };
  }
}
