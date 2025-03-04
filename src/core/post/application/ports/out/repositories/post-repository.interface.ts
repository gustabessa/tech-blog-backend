import { IPostProps, Post, PostIdentifier, Tag } from 'src/core/post/domain';
import { AbstractRepository } from 'src/shared/interfaces';
import { Result } from 'src/shared/utils';

export abstract class IPostRepository extends AbstractRepository<
  Post,
  PostIdentifier,
  IPostProps
> {
  abstract findTagsByTagIds(tagIds: number[]): Promise<Result<Tag[]>>;
}
