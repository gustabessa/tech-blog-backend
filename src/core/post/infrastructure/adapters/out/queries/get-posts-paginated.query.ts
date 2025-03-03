import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Injectable, Provider } from '@nestjs/common';
import {
  IGetPostsPaginated,
  IGetPostsPaginatedDTO,
} from 'src/core/post/application';
import { IGetPostsResultDTO } from 'src/core/post/application/ports/out/dtos/get-posts-result-dto.interface';
import { AbstractPaginatedResponseDTO } from 'src/shared/interfaces';
import { Result } from 'src/shared/utils';
import { PostMikroOrmEntity } from '../../entities/post.mikro-orm-entity';

@Injectable()
export class GetPostsPaginated implements IGetPostsPaginated {
  constructor(private readonly em: EntityManager) {}

  async execute(
    value: IGetPostsPaginatedDTO,
  ): Promise<Result<AbstractPaginatedResponseDTO<IGetPostsResultDTO>>> {
    const { page, limit, title } = value;
    const statements: FilterQuery<PostMikroOrmEntity> = [];

    if (title !== null) {
      statements.push({ title: { $ilike: `%${title}%` } });
    }

    const [postsPage, total] = await this.em.findAndCount(
      PostMikroOrmEntity,
      { $or: statements },
      {
        offset: page * limit,
        limit,
      },
    );

    return Result.ok({
      data: postsPage.map((post) => ({
        id: post.id,
        title: post.title,
        authorId: post.authorId,
        createdAt: post.createdAt,
      })),
      total,
      page,
      limit,
    });
  }
}

export const GetPostsPaginatedQueryProvider: Provider<IGetPostsPaginated> = {
  provide: IGetPostsPaginated,
  useClass: GetPostsPaginated,
};
