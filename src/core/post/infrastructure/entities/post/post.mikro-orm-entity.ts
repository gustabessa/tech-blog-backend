import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { IPostMikroOrmEntity } from './post-mikro-orm-entity.interface';
import { TagMikroOrmEntity } from '../tag/tag.mikro-orm-entity';

@Entity({ tableName: 'posts' })
export class PostMikroOrmEntity {
  @PrimaryKey({ autoincrement: true })
  readonly id: number | undefined;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property()
  authorId: number;

  @Property({ onCreate: () => new Date() })
  createdAt: Date | null;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date | null;

  @ManyToMany({
    entity: () => TagMikroOrmEntity,
    owner: true,
    pivotTable: 'post_tags',
    joinColumn: 'post_id',
    inverseJoinColumn: 'tag_id',
  })
  tags: Collection<TagMikroOrmEntity>;

  constructor(props: IPostMikroOrmEntity) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.tags = new Collection<TagMikroOrmEntity>(this, props.tags);
  }
}
