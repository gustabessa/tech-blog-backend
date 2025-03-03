import { Controller, Get, Query } from '@nestjs/common';
import { GetPostsPaginatedDTO } from '../dtos/get-posts-paginated.dto';
import { IGetPostsPaginated } from 'src/core/post/application';

@Controller('posts')
export class PostController {
  constructor(private readonly getPostsPaginated: IGetPostsPaginated) {}

  @Get()
  getPosts(@Query() dto: GetPostsPaginatedDTO) {
    return this.getPostsPaginated.execute(dto);
  }
}
