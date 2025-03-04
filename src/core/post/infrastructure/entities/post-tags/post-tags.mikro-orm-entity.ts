import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IPostTagsMikroOrmEntity } from './post-tags-mikro-orm-entity.interface';

@Entity({ tableName: 'post_tags' })
export class PostTagsMikroOrmEntity {
  @PrimaryKey()
  readonly id: number | undefined;

  @Property()
  postId: number;

  @Property()
  tagId: number;

  @Property({ onCreate: () => new Date() })
  createdAt: Date | null;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date | null;

  constructor(dto: IPostTagsMikroOrmEntity) {
    this.id = dto.id;
    this.postId = dto.postId;
    this.tagId = dto.tagId;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
