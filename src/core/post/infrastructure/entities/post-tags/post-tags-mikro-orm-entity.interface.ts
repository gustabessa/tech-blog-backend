export interface IPostTagsMikroOrmEntity {
  id: number | undefined;
  postId: number;
  tagId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
