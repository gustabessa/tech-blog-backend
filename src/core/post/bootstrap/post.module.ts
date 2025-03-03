import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule } from '@nestjs/common';
import { PostMikroOrmEntity } from '../infrastructure/adapters/entities/post.mikro-orm-entity';
import { GetPostsPaginatedQueryProvider } from '../infrastructure/adapters/out/queries/get-posts-paginated.query';
import { PostController } from '../infrastructure/adapters/in/controllers/post.controller';

const providers = [GetPostsPaginatedQueryProvider];

export class CorePostModule {
  static register(): DynamicModule {
    return {
      module: CorePostModule,
      imports: [
        MikroOrmModule.forFeature({
          entities: [PostMikroOrmEntity],
        }),
      ],
      controllers: [PostController],
      providers,
      exports: providers,
    };
  }
}
