import { AbstractPaginatedRequestDTO } from 'src/shared/interfaces';

export interface IGetTagsPaginatedDTO extends AbstractPaginatedRequestDTO {
  name: string | null;
}
