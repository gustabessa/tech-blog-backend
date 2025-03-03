import { DynamicModule } from '@nestjs/common';
import { CreateUserProvider } from '../application';
import {
  UserController,
  UserMikroOrmEntity,
  UserMikroOrmRepositoryProvider,
} from '../infrastructure';
import { MikroOrmModule } from '@mikro-orm/nestjs';

const providers = [UserMikroOrmRepositoryProvider, CreateUserProvider];

export class CoreUserModule {
  static register(): DynamicModule {
    return {
      module: CoreUserModule,
      imports: [
        MikroOrmModule.forFeature({
          entities: [UserMikroOrmEntity],
        }),
      ],
      controllers: [UserController],
      providers,
      exports: providers,
    };
  }
}
