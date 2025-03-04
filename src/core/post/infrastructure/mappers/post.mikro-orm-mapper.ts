import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { UserIdentifier } from 'src/core/user/domain';
import { DateVO } from 'src/shared/utils';
import { TagMapper } from './tag.mikro-orm-mapper';
import { Post, PostIdentifier } from '../../domain';
import { PostMikroOrmEntity } from '../entities/post/post.mikro-orm-entity';

@Injectable()
export class PostMapper {
  constructor(
    private readonly em: EntityManager,
    private readonly tagMapper: TagMapper,
  ) {}

  toDomain(post: PostMikroOrmEntity): Post {
    return Post.create(
      {
        title: post.title,
        content: post.content,
        authorId: new UserIdentifier(post.authorId),
        tags: post.tags.getItems().map((tag) => this.tagMapper.toDomain(tag)),
        createdAt: post.createdAt ? new DateVO({ date: post.createdAt }) : null,
        updatedAt: post.updatedAt ? new DateVO({ date: post.updatedAt }) : null,
      },
      post.id ? new PostIdentifier(post.id) : undefined,
    );
  }

  toPersistence(post: Post): PostMikroOrmEntity {
    const postEntity = new PostMikroOrmEntity({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId.value,
      tags: post.tags.map((tag) => this.tagMapper.toPersistence(tag)),
      createdAt: post.createdAt?.date ?? null,
      updatedAt: post.updatedAt?.date ?? null,
    });

    if (post.id) {
      this.em.merge(postEntity, { refresh: true });
    }

    return postEntity;
  }
}
