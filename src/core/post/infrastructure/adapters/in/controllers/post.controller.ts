import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetPostsPaginatedDTO } from '../dtos/get-posts-paginated.dto';
import { IGetPostsPaginated } from 'src/core/post/application';
import { HttpAuthGuard } from 'src/shared/providers/http-authentication';

@Controller('posts')
export class PostController {
  constructor(private readonly getPostsPaginated: IGetPostsPaginated) {}

  @Get('')
  @UseGuards(HttpAuthGuard)
  getPostsPaginatedFn(@Query() dto: GetPostsPaginatedDTO) {
    return this.getPostsPaginated.execute(dto);
  }
}
