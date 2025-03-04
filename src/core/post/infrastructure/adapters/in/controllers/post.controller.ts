import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { IGetPostsPaginated, IPublishPost } from 'src/core/post/application';
import {
  HttpAuthGuard,
  ILoggedUser,
} from 'src/shared/providers/http-authentication';
import { LoggedUser } from 'src/shared/utils';
import { GetPostsPaginatedDTO } from '../dtos/get-posts-paginated.dto';
import { PublishPostDTO } from '../dtos/publish-post.dto';

@Controller('posts')
export class PostController {
  constructor(
    private readonly getPostsPaginated: IGetPostsPaginated,
    private readonly publishPost: IPublishPost,
  ) {}

  @Get('')
  @UseGuards(HttpAuthGuard)
  getPostsPaginatedFn(@Query() dto: GetPostsPaginatedDTO) {
    return this.getPostsPaginated.execute(dto);
  }

  @Post('')
  @UseGuards(HttpAuthGuard)
  publishPostFn(@Body() dto: PublishPostDTO, @LoggedUser() user: ILoggedUser) {
    return this.publishPost.execute({ ...dto, authorId: user.id });
  }
}
