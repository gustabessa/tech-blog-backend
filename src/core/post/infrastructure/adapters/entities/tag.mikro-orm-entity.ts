import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'tags' })
export class TagMikroOrmEntity {
  @PrimaryKey()
  readonly id!: number;

  @Property()
  name!: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
