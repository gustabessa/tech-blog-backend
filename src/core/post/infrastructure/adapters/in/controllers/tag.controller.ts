import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IGetTagsPaginated } from 'src/core/post/application';
import { HttpAuthGuard } from 'src/shared/providers/http-authentication';
import { GetTagsPaginatedDTO } from '../dtos/get-tags-paginated.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly getTagsPaginated: IGetTagsPaginated) {}

  @Get('')
  @UseGuards(HttpAuthGuard)
  getTagsPaginatedFn(@Query() dto: GetTagsPaginatedDTO) {
    return this.getTagsPaginated.execute(dto);
  }
}
