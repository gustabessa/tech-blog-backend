import { DynamicModule } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { MikroOrmDatabaseModule } from './database/mikro-orm-database.module';

export class CoreInfrastructureModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: CoreInfrastructureModule,
      imports: [
        ConfigurationModule.register(),
        MikroOrmDatabaseModule.register(),
      ],
    };
  }
}
