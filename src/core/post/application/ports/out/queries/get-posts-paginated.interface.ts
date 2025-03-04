import { AbstractPaginatedResponseDTO, UseCase } from 'src/shared/interfaces';
import { IGetPostsPaginatedDTO } from '../../in/dtos/get-posts-paginated-dto.interface';
import { IGetPostsPaginatedResponseDTO } from '../dtos/get-posts-paginated-response-dto.interface';

export abstract class IGetPostsPaginated extends UseCase<
  IGetPostsPaginatedDTO,
  AbstractPaginatedResponseDTO<IGetPostsPaginatedResponseDTO>
> {}
