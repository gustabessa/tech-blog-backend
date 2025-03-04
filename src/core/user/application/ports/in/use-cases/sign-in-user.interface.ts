import { UseCase } from 'src/shared/interfaces';
import { ISignInUserResponseDTO } from '../../out/dtos/sign-in-user-response-dto.interface';
import { ISignInUserDTO } from '../dtos/sign-in-user-dto.interface';

export abstract class ISignInUser extends UseCase<
  ISignInUserDTO,
  ISignInUserResponseDTO
> {}
