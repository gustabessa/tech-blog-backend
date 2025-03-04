import { UseCase } from 'src/shared/interfaces';
import { ISignInUserDTO } from '../dtos/sign-in-user-dto.interface';
import { ISignInUserResultDTO } from '../../out/dtos/sign-in-user-result-dto.interface';

export abstract class ISignInUser extends UseCase<
  ISignInUserDTO,
  ISignInUserResultDTO
> {}
