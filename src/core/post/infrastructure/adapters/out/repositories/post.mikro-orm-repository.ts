import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Injectable, Provider } from '@nestjs/common';
import { IPostRepository } from 'src/core/post/application';
import { Post, PostIdentifier, Tag } from 'src/core/post/domain';
import { EApplicationErrorKind, formatError, Result } from 'src/shared/utils';
import { PostMikroOrmEntity } from '../../../entities/post/post.mikro-orm-entity';
import { TagMikroOrmEntity } from '../../../entities/tag/tag.mikro-orm-entity';
import { PostMapper } from '../../../mappers/post.mikro-orm-mapper';
import { TagMapper } from '../../../mappers/tag.mikro-orm-mapper';

@Injectable()
export class PostMikroOrmRepository implements IPostRepository {
  private readonly postRepository: EntityRepository<PostMikroOrmEntity>;
  private readonly tagRepository: EntityRepository<TagMikroOrmEntity>;

  constructor(
    private readonly em: EntityManager,
    private readonly postMapper: PostMapper,
    private readonly tagMapper: TagMapper,
  ) {
    this.postRepository = this.em.getRepository(PostMikroOrmEntity);
    this.tagRepository = this.em.getRepository(TagMikroOrmEntity);
  }

  async persist(aggregate: Post): Promise<Result<PostIdentifier>> {
    try {
      const postEntity = this.postMapper.toPersistence(aggregate);
      await this.em.persistAndFlush(postEntity);

      return Result.ok(new PostIdentifier(postEntity.id as number));
    } catch (error) {
      const { message, stackTrace } = formatError(error);
      return Result.error({
        message,
        stackTrace,
        errorKind: EApplicationErrorKind.INTERNAL_SERVER_ERROR,
      });
    }
  }
  async getById(id: PostIdentifier): Promise<Result<Post>> {
    const post = await this.postRepository.findOne({
      id: id.value,
    });

    if (!post) {
      return Result.error({
        message: 'Post not found.',
        errorKind: EApplicationErrorKind.RESOURCE_NOT_FOUND,
      });
    }

    return Result.ok(this.postMapper.toDomain(post));
  }

  async findTagsByTagIds(tagIds: number[]): Promise<Result<Tag[]>> {
    const tags = await this.tagRepository.find({
      id: { $in: tagIds },
    });

    const foundTagIds = new Set(tags.map((tag) => tag.id));
    for (const tagId of tagIds) {
      if (!foundTagIds.has(tagId)) {
        return Result.error({
          message: `Tag with id ${tagId} not found.`,
          errorKind: EApplicationErrorKind.RESOURCE_NOT_FOUND,
        });
      }
    }

    return Result.ok(tags.map((tag) => this.tagMapper.toDomain(tag)));
  }
}

export const PostMikroOrmRepositoryProvider: Provider<IPostRepository> = {
  provide: IPostRepository,
  useClass: PostMikroOrmRepository,
};
