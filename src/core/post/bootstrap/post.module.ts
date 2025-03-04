import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule } from '@nestjs/common';
import {
  GetPostsPaginatedQueryProvider,
  PostController,
  PostMikroOrmEntity,
  TagMikroOrmEntity,
} from '../infrastructure';

const providers = [GetPostsPaginatedQueryProvider];

export class CorePostModule {
  static register(): DynamicModule {
    return {
      module: CorePostModule,
      imports: [
        MikroOrmModule.forFeature({
          entities: [PostMikroOrmEntity, TagMikroOrmEntity],
        }),
      ],
      controllers: [PostController],
      providers,
      exports: providers,
    };
  }
}
