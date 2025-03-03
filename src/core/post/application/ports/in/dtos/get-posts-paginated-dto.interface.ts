import { AbstractPaginatedRequestDTO } from 'src/shared/interfaces';

export interface IGetPostsPaginatedDTO extends AbstractPaginatedRequestDTO {
  title: string | null;
}
