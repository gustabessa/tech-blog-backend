import { UseCase } from 'src/shared/interfaces';
import { IPublishPostResponseDTO } from '../../out/dtos/publish-post-response-dto.interface';
import { IPublishPostDTO } from '../dtos/publish-post-dto.interface';

export abstract class IPublishPost extends UseCase<
  IPublishPostDTO,
  IPublishPostResponseDTO
> {}
