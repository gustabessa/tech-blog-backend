import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ITagMikroOrmEntity } from './tag-mikro-orm-entity.interface';

@Entity({ tableName: 'tags' })
export class TagMikroOrmEntity {
  @PrimaryKey()
  readonly id: number | undefined;

  @Property()
  name!: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date | null;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date | null;

  constructor(dto: ITagMikroOrmEntity) {
    this.id = dto.id;
    this.name = dto.name;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
