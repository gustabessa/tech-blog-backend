import { Injectable, Provider } from '@nestjs/common';
import { IEncrypter } from 'src/shared/providers/encrypter';
import { IHttpAuthentication } from 'src/shared/providers/http-authentication';
import { ILogger } from 'src/shared/providers/logger';
import { EApplicationErrorKind, Result } from 'src/shared/utils';
import { ISignInUserDTO } from '../ports/in/dtos/sign-in-user-dto.interface';
import { ISignInUser } from '../ports/in/use-cases/sign-in-user.interface';
import { ISignInUserResultDTO } from '../ports/out/dtos/sign-in-user-result-dto.interface';
import { IUserRepository } from '../ports/out/repositories/user-repository.interface';

@Injectable()
export class SignInUser implements ISignInUser {
  constructor(
    private readonly encrypter: IEncrypter,
    private readonly httpAuthentication: IHttpAuthentication,
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(dto: ISignInUserDTO): Promise<Result<ISignInUserResultDTO>> {
    const { email, password } = dto;
    const userByEmailResult = await this.userRepository.findByEmail(email);
    if (userByEmailResult.isError()) {
      this.logger.error(
        `Unable to sign in: ${userByEmailResult.error.message}`,
        userByEmailResult.error.stack,
      );
      return userByEmailResult.copyWith({
        errorKind: EApplicationErrorKind.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const encrypterCompareResult = await this.encrypter.compare({
      value: password,
      hash: userByEmailResult.value.password,
      salt: userByEmailResult.value.salt,
    });

    if (encrypterCompareResult.isError()) {
      this.logger.error(
        `Error comparing password: ${encrypterCompareResult.error.message}`,
        encrypterCompareResult.error.stack,
      );
      return encrypterCompareResult.copyWith({
        message:
          'An internal server error happened while trying to sign-in user. Please, try again later.',
      });
    }
    const { matches } = encrypterCompareResult.value;

    if (!matches) {
      this.logger.warn(
        `Invalid credentials on sign-in attempt for user with email: ${email}`,
      );
      return Result.error({
        errorKind: EApplicationErrorKind.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const httpAuthSignResult = await this.httpAuthentication.sign({
      loggedUserClaims: {
        id: userByEmailResult.value.id as number,
        email: userByEmailResult.value.email,
        name: userByEmailResult.value.name,
        socialHandle: userByEmailResult.value.socialHandle,
      },
    });

    if (httpAuthSignResult.isError()) {
      this.logger.error(
        `Error signing user: ${httpAuthSignResult.error.message}`,
        httpAuthSignResult.error.stack,
      );
      return httpAuthSignResult.copyWith({
        message:
          'An internal server error happened while trying to sign-in user. Please, try again later.',
      });
    }

    return httpAuthSignResult.mapOk(({ prefix, token }) => ({
      accessToken: token,
      prefix,
    }));
  }
}

export const SignInUserProvider: Provider<ISignInUser> = {
  provide: ISignInUser,
  useClass: SignInUser,
};
