import { AbstractPaginatedResponseDTO, UseCase } from 'src/shared/interfaces';
import { IGetPostsResultDTO } from '../dtos/get-posts-result-dto.interface';
import { IGetPostsPaginatedDTO } from '../../in/dtos/get-posts-paginated-dto.interface';

export abstract class IGetPostsPaginated extends UseCase<
  IGetPostsPaginatedDTO,
  AbstractPaginatedResponseDTO<IGetPostsResultDTO>
> {}
