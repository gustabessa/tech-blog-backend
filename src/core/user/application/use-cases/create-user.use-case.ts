import { Injectable, Provider } from '@nestjs/common';
import { ILogger } from 'src/shared/providers/logger';
import { EApplicationErrorKind, Result } from 'src/shared/utils';
import { User } from '../../domain';
import { ICreateUser } from '../ports/in/use-cases/create-user.interface';
import { IUserRepository } from '../ports/out/repositories/user-repository.interface';
import { ICreateUserDTO } from '../ports/in/dtos/create-user-dto.interface';
import { ICreateUserResultDTO } from '../ports/out/dtos/create-user-result-dto.interface';

@Injectable()
export class CreateUser implements ICreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(dto: ICreateUserDTO): Promise<Result<ICreateUserResultDTO>> {
    const userExists = await this.userRepository.findByEmailOrSocialHandle({
      email: dto.email,
      socialHandle: dto.socialHandle,
    });
    if (userExists.isOk()) {
      return Result.error({
        errorKind: EApplicationErrorKind.CONFLICT,
        message: 'User already exists',
      });
    }

    const user = User.create(dto);
    const result = await this.userRepository.persist(user);

    if (result.isError()) {
      this.logger.error(`Error creating user: ${result.error.message}`);
      return result;
    }

    return result.mapOk((identifier) => ({ id: identifier.value }));
  }
}

export const CreateUserProvider: Provider<ICreateUser> = {
  provide: ICreateUser,
  useClass: CreateUser,
};
