import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule } from '@nestjs/common';
import { PublishPostProvider } from '../application';
import {
  GetPostsPaginatedQueryProvider,
  GetTagsPaginatedQueryProvider,
  PostController,
  PostMikroOrmEntity,
  PostMikroOrmRepositoryProvider,
  TagController,
  TagMikroOrmEntity,
  PostMapper,
  TagMapper,
} from '../infrastructure';

const providers = [
  GetPostsPaginatedQueryProvider,
  GetTagsPaginatedQueryProvider,
  PostMikroOrmRepositoryProvider,
  PublishPostProvider,
  PostMapper,
  TagMapper,
];

export class CorePostModule {
  static register(): DynamicModule {
    return {
      module: CorePostModule,
      imports: [
        MikroOrmModule.forFeature({
          entities: [PostMikroOrmEntity, TagMikroOrmEntity],
        }),
      ],
      controllers: [PostController, TagController],
      providers,
      exports: providers,
    };
  }
}
