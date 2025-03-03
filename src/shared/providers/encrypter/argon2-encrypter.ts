import { Injectable, Provider } from '@nestjs/common';
import {
  ICompareArgs,
  ICompareResult,
  IEncryptArgs,
  IEncrypter,
  IEncryptResult,
} from './encrypter.interface';
import { formatError, Result } from 'src/shared/utils';
import argon2 from 'argon2';
import { randomBytes } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import {
  IAppConfigurations,
  IEncrypterConfigurations,
} from 'src/shared/interfaces';

@Injectable()
export class Argon2Encrypter implements IEncrypter {
  private readonly encrypterConfigurations: IEncrypterConfigurations;
  constructor(
    private readonly configService: ConfigService<IAppConfigurations>,
  ) {
    this.encrypterConfigurations =
      this.configService.getOrThrow<IEncrypterConfigurations>('encrypter');
  }

  async encrypt({ value }: IEncryptArgs): Promise<Result<IEncryptResult>> {
    try {
      const salt = randomBytes(16);
      const combinedBuffer = Buffer.concat([
        Buffer.from(value),
        salt,
        Buffer.from(this.encrypterConfigurations.secret),
      ]);

      const hash = await argon2.hash(combinedBuffer);
      return Result.ok({ hash, salt: salt.toString('hex') });
    } catch (error) {
      const { message, stackTrace } = formatError(error);
      return Result.error({ message, stackTrace });
    }
  }

  async compare({
    value,
    hash,
    salt,
  }: ICompareArgs): Promise<Result<ICompareResult>> {
    try {
      const combinedBuffer = Buffer.concat([
        Buffer.from(value),
        Buffer.from(salt, 'hex'),
        Buffer.from(this.encrypterConfigurations.secret),
      ]);

      const matches = await argon2.verify(hash, combinedBuffer);
      return Result.ok({ matches });
    } catch (error) {
      const { message, stackTrace } = formatError(error);
      return Result.error({ message, stackTrace });
    }
  }
}

export const Argon2EncrypterProvider: Provider<IEncrypter> = {
  provide: IEncrypter,
  useClass: Argon2Encrypter,
};
