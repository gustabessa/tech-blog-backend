import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  IAppConfigurations,
  IAuthenticationConfigurations,
} from 'src/shared/interfaces';
import { EApplicationErrorKind, Result, formatError } from 'src/shared/utils';
import {
  IHttpAuthentication,
  ILoggedUser,
  ISignArgs,
  ISignResult,
  IVerifyArgs,
  IVerifyResult,
} from './http-authentication.interface';

@Injectable()
export class JwtAuthentication implements IHttpAuthentication {
  private readonly configurations: IAuthenticationConfigurations;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IAppConfigurations>,
  ) {
    this.configurations =
      this.configService.getOrThrow<IAuthenticationConfigurations>(
        'authentication',
      );
  }

  async sign({ loggedUserClaims }: ISignArgs): Promise<Result<ISignResult>> {
    try {
      const token = await this.jwtService.signAsync(loggedUserClaims, {
        secret: this.configurations.secret,
        expiresIn: this.configurations.expiresIn,
      });
      return Result.ok({
        token,
        prefix: this.configurations.prefix,
      });
    } catch (error) {
      const { message, stackTrace } = formatError(error);
      return Result.error({ message, stackTrace });
    }
  }

  async verify({ token, prefix }: IVerifyArgs): Promise<Result<IVerifyResult>> {
    try {
      if (prefix !== this.configurations.prefix) {
        return Result.error({
          message: 'Invalid token prefix',
          errorKind: EApplicationErrorKind.UNAUTHORIZED,
        });
      }

      const loggedUserClaims = await this.jwtService.verifyAsync<ILoggedUser>(
        token,
        {
          secret: this.configurations.secret,
        },
      );

      return Result.ok({
        loggedUserClaims,
      });
    } catch (error) {
      const { message, stackTrace } = formatError(error);
      return Result.error({ message, stackTrace });
    }
  }
}

export const JwtAuthenticationProvider: Provider<IHttpAuthentication> = {
  provide: IHttpAuthentication,
  useClass: JwtAuthentication,
};
