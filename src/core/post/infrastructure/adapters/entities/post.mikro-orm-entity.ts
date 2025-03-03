import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'posts' })
export class PostMikroOrmEntity {
  @PrimaryKey()
  readonly id!: number;

  @Property()
  title!: string;

  @Property()
  content!: string;

  @Property()
  authorId!: number;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
