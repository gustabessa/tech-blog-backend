import { ITagMikroOrmEntity } from '../tag/tag-mikro-orm-entity.interface';

export interface IPostMikroOrmEntity {
  id: number | undefined;
  title: string;
  content: string;
  authorId: number;
  tags: ITagMikroOrmEntity[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
