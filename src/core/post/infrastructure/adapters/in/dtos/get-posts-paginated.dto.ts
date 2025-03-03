import { IsOptional, IsString } from 'class-validator';
import { IGetPostsPaginatedDTO } from 'src/core/post/application';
import { AbstractPaginatedRequestDTO } from 'src/shared/interfaces';

export class GetPostsPaginatedDTO
  extends AbstractPaginatedRequestDTO
  implements IGetPostsPaginatedDTO
{
  @IsOptional()
  @IsString()
  title: string | null = null;
}
