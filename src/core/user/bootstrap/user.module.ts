import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule } from '@nestjs/common';
import { CreateUserProvider, SignInUserProvider } from '../application';
import {
  AuthController,
  UserController,
  UserMikroOrmEntity,
  UserMikroOrmRepositoryProvider,
} from '../infrastructure';

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
