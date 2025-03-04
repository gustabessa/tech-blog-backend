import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateVO } from 'src/shared/utils';
import { Tag, TagIdentifier } from '../../domain';
import { TagMikroOrmEntity } from '../entities/tag/tag.mikro-orm-entity';

@Injectable()
export class TagMapper {
  constructor(private readonly em: EntityManager) {}

  toDomain(tag: TagMikroOrmEntity): Tag {
    return Tag.create(
      {
        name: tag.name,
        createdAt: tag.createdAt ? new DateVO({ date: tag.createdAt }) : null,
        updatedAt: tag.updatedAt ? new DateVO({ date: tag.updatedAt }) : null,
      },
      tag.id ? new TagIdentifier(tag.id) : undefined,
    );
  }

  toPersistence(tag: Tag): TagMikroOrmEntity {
    const tagEntity = new TagMikroOrmEntity({
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt?.date ?? null,
      updatedAt: tag.updatedAt?.date ?? null,
    });

    if (tag.id) {
      this.em.merge(tagEntity, { refresh: true });
    }

    return tagEntity;
  }
}
