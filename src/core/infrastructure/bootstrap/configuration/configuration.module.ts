import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentValidation } from './environment-validation';
import { loadConfigurations } from './load-configurations';

@Module({})
export class ConfigurationModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: ConfigurationModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
          load: [loadConfigurations],
          validate: (config: Record<string, unknown>) => {
            const environmentVariables = plainToInstance<
              EnvironmentValidation,
              Record<string, unknown>
            >(EnvironmentValidation, config, {
              enableImplicitConversion: true,
            });

            const errors = validateSync(environmentVariables, {
              skipMissingProperties: false,
            });

            if (errors.length > 0) throw new Error(errors.toString());

            return environmentVariables;
          },
        }),
      ],
    };
  }
}
