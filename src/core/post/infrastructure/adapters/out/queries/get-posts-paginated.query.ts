import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Injectable, Provider } from '@nestjs/common';
import {
  IGetPostsPaginated,
  IGetPostsPaginatedDTO,
  IGetPostsPaginatedResponseDTO,
} from 'src/core/post/application';
import { AbstractPaginatedResponseDTO } from 'src/shared/interfaces';
import { Result } from 'src/shared/utils';
import { PostMikroOrmEntity } from '../../../entities/post/post.mikro-orm-entity';

@Injectable()
export class GetPostsPaginated implements IGetPostsPaginated {
  constructor(private readonly em: EntityManager) {}

  async execute(
    dto: IGetPostsPaginatedDTO,
  ): Promise<
    Result<AbstractPaginatedResponseDTO<IGetPostsPaginatedResponseDTO>>
  > {
    const { page, limit, title } = dto;
    const statements: FilterQuery<PostMikroOrmEntity> = [];

    if (title !== null) {
      statements.push({ title: { $ilike: `%${title}%` } });
    }

    const [pageData, total] = await this.em.findAndCount(
      PostMikroOrmEntity,
      { $or: statements },
      {
        offset: page * limit,
        limit,
      },
    );

    return Result.ok({
      data: pageData.map((post) => ({
        id: post.id as number,
        title: post.title,
        authorId: post.authorId,
        createdAt: post.createdAt as Date,
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
