import { UseCase } from 'src/shared/interfaces';
import { ICreateUserResponseDTO } from '../../out/dtos/create-user-response-dto.interface';
import { ICreateUserDTO } from '../dtos/create-user-dto.interface';

export abstract class ICreateUser extends UseCase<
  ICreateUserDTO,
  ICreateUserResponseDTO
> {}
