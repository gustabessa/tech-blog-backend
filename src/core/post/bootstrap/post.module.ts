import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule } from '@nestjs/common';
import {
  GetPostsPaginatedQueryProvider,
  GetTagsPaginatedQueryProvider,
  PostController,
  PostMikroOrmEntity,
  TagController,
  TagMikroOrmEntity,
} from '../infrastructure';

const providers = [
  GetPostsPaginatedQueryProvider,
  GetTagsPaginatedQueryProvider,
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
