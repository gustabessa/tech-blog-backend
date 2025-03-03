import { UseCase } from 'src/shared/interfaces';
import { ICreateUserResultDTO } from '../../out/dtos/create-user-result-dto.interface';
import { ICreateUserDTO } from '../dtos/create-user-dto.interface';

export abstract class ICreateUser extends UseCase<
  ICreateUserDTO,
  ICreateUserResultDTO
> {}
