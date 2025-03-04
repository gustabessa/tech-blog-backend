import { Injectable, Provider } from '@nestjs/common';
import { IEncrypter } from 'src/shared/providers/encrypter';
import { ILogger } from 'src/shared/providers/logger';
import { EApplicationErrorKind, Result } from 'src/shared/utils';
import { User } from '../../domain';
import { ICreateUserDTO } from '../ports/in/dtos/create-user-dto.interface';
import { ICreateUser } from '../ports/in/use-cases/create-user.interface';
import { ICreateUserResponseDTO } from '../ports/out/dtos/create-user-response-dto.interface';
import { IUserRepository } from '../ports/out/repositories/user-repository.interface';

@Injectable()
export class CreateUser implements ICreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypter: IEncrypter,
    private readonly logger: ILogger,
  ) {}

  async execute(dto: ICreateUserDTO): Promise<Result<ICreateUserResponseDTO>> {
    const { name, email, socialHandle, password } = dto;
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

    const encryptionResult = await this.encrypter.encrypt({
      value: password,
    });
    if (encryptionResult.isError()) {
      this.logger.error(
        `Error encrypting password: ${encryptionResult.error.message}`,
        encryptionResult.error.stack,
      );
      return encryptionResult.copyWith({
        message:
          'An internal server error happened while trying to sign-up user. Please, try again later.',
      });
    }
    const { hash, salt } = encryptionResult.value;

    const user = User.create({
      name,
      email,
      socialHandle,
      password: hash,
      salt,
      createdAt: null,
      updatedAt: null,
    });

    const persistUserResult = await this.userRepository.persist(user);

    if (persistUserResult.isError()) {
      this.logger.error(
        `Error creating user: ${persistUserResult.error.message}`,
        persistUserResult.error.stack,
      );
      return persistUserResult.copyWith({
        message:
          'An internal server error happened while trying to sign-up user. Please, try again later.',
      });
    }

    return persistUserResult.mapOk((identifier) => ({
      id: identifier.value,
    }));
  }
}

export const CreateUserProvider: Provider<ICreateUser> = {
  provide: ICreateUser,
  useClass: CreateUser,
};
