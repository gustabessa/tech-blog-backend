import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { Injectable, Provider } from '@nestjs/common';
import {
  IGetTagsPaginated,
  IGetTagsPaginatedDTO,
  IGetTagsPaginatedResponseDTO,
} from 'src/core/post/application';
import { AbstractPaginatedResponseDTO } from 'src/shared/interfaces';
import { Result } from 'src/shared/utils';
import { TagMikroOrmEntity } from '../../entities/tag.mikro-orm-entity';

@Injectable()
export class GetTagsPaginated implements IGetTagsPaginated {
  constructor(private readonly em: EntityManager) {}

  async execute(
    dto: IGetTagsPaginatedDTO,
  ): Promise<
    Result<AbstractPaginatedResponseDTO<IGetTagsPaginatedResponseDTO>>
  > {
    const { page, limit, name } = dto;
    const statements: FilterQuery<TagMikroOrmEntity> = [];

    if (name !== null) {
      statements.push({ name: { $ilike: `%${name}%` } });
    }

    const [pageData, total] = await this.em.findAndCount(
      TagMikroOrmEntity,
      { $or: statements },
      {
        offset: page * limit,
        limit,
      },
    );

    return Result.ok({
      data: pageData.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
      total,
      page,
      limit,
    });
  }
}

export const GetTagsPaginatedQueryProvider: Provider<IGetTagsPaginated> = {
  provide: IGetTagsPaginated,
  useClass: GetTagsPaginated,
};
