import { AbstractPaginatedResponseDTO, UseCase } from 'src/shared/interfaces';
import { IGetPostsPaginatedDTO } from '../../in/dtos/get-posts-paginated-dto.interface';
import { IGetPostsResultDTO } from '../dtos/get-posts-result-dto.interface';

export abstract class IGetPostsPaginated extends UseCase<
  IGetPostsPaginatedDTO,
  AbstractPaginatedResponseDTO<IGetPostsResultDTO>
> {}
