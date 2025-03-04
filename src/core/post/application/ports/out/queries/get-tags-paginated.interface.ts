import { AbstractPaginatedResponseDTO, UseCase } from 'src/shared/interfaces';
import { IGetTagsPaginatedDTO } from '../../in/dtos/get-tags-paginated-dto.interface';
import { IGetTagsPaginatedResponseDTO } from '../dtos/get-tags-paginated-response-dto.interface';

export abstract class IGetTagsPaginated extends UseCase<
  IGetTagsPaginatedDTO,
  AbstractPaginatedResponseDTO<IGetTagsPaginatedResponseDTO>
> {}
