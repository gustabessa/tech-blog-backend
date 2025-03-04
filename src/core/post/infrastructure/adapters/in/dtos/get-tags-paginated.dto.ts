import { IsOptional, IsString } from 'class-validator';
import { IGetTagsPaginatedDTO } from 'src/core/post/application';
import { AbstractPaginatedRequestDTO } from 'src/shared/interfaces';

export class GetTagsPaginatedDTO
  extends AbstractPaginatedRequestDTO
  implements IGetTagsPaginatedDTO
{
  @IsOptional()
  @IsString()
  name: string | null = null;
}
