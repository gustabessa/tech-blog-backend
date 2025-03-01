import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { DynamicModule } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {
  IAppConfigurations,
  IDatabaseConfigurations,
} from 'src/shared/interfaces';

export class DatabaseModule {
  static register(): DynamicModule {
    const factory = (
      configService: ConfigService<IAppConfigurations>,
    ): MikroOrmModuleOptions => {
      const databaseConfigs =
        configService.getOrThrow<IDatabaseConfigurations>('database');
      const environment = configService.getOrThrow<string>('env');
      return {
        driver: PostgreSqlDriver,
        host: databaseConfigs.host,
        dbName: databaseConfigs.name,
        port: Number(databaseConfigs.port),
        user: databaseConfigs.user,
        password: databaseConfigs.password,
        discovery: {
          checkDuplicateTableNames: false,
        },
        pool: {
          min: 2,
          max: Number(databaseConfigs.maxPool) || 50,
        },
        autoLoadEntities: true,
        debug: environment === 'development',
        namingStrategy: UnderscoreNamingStrategy,
        charset: 'utf8mb4',
        driverOptions: {
          connection: {
            ssl: environment === 'production',
          },
        },
      };
    };

    return {
      global: true,
      module: DatabaseModule,
      imports: [
        MikroOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: factory,
        }),
      ],
    };
  }
}
