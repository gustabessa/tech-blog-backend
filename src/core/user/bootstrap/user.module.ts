import { DynamicModule } from '@nestjs/common';
import { CreateUserProvider, SignInUserProvider } from '../application';
import {
  UserController,
  AuthController,
  UserMikroOrmEntity,
  UserMikroOrmRepositoryProvider,
} from '../infrastructure';
import { MikroOrmModule } from '@mikro-orm/nestjs';

const providers = [
  UserMikroOrmRepositoryProvider,
  CreateUserProvider,
  SignInUserProvider,
];

export class CoreUserModule {
  static register(): DynamicModule {
    return {
      module: CoreUserModule,
      imports: [
        MikroOrmModule.forFeature({
          entities: [UserMikroOrmEntity],
        }),
      ],
      controllers: [AuthController, UserController],
      providers,
      exports: providers,
    };
  }
}
