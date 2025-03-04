import { Injectable, Provider } from '@nestjs/common';
import { UserIdentifier } from 'src/core/user/domain';
import { ILogger } from 'src/shared/providers/logger';
import { Result } from 'src/shared/utils';
import { Post } from '../../domain';
import { IPublishPostDTO } from '../ports/in/dtos/publish-post-dto.interface';
import { IPublishPost } from '../ports/in/use-cases/publish-post.interface';
import { IPublishPostResponseDTO } from '../ports/out/dtos/publish-post-response-dto.interface';
import { IPostRepository } from '../ports/out/repositories/post-repository.interface';

@Injectable()
export class PublishPost implements IPublishPost {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(
    dto: IPublishPostDTO,
  ): Promise<Result<IPublishPostResponseDTO>> {
    const tagsResult = await this.postRepository.findTagsByTagIds(dto.tagIds);
    if (tagsResult.isError()) {
      this.logger.error(
        `Error gettings tags by id: ${tagsResult.error.message}`,
        tagsResult.error.stack,
      );
      return tagsResult.copyWith({
        message: 'Failed to publish post due to invalid tags.',
      });
    }
    const tags = tagsResult.value;

    const post = Post.create({
      title: dto.title,
      content: dto.content,
      authorId: new UserIdentifier(dto.authorId),
      tags,
      createdAt: null,
      updatedAt: null,
    });
    const persistPostResult = await this.postRepository.persist(post);
    if (persistPostResult.isError()) {
      this.logger.error(
        `Error persisting post: ${persistPostResult.error.message}`,
        persistPostResult.error.stack,
      );
      return persistPostResult.copyWith({
        message: 'Failed to publish post.',
      });
    }

    return persistPostResult.mapOk((identifier) => ({
      id: identifier.value as number,
    }));
  }
}

export const PublishPostProvider: Provider<IPublishPost> = {
  provide: IPublishPost,
  useClass: PublishPost,
};
