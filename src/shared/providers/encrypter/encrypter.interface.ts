import { Result } from 'src/shared/utils';

export interface IEncryptArgs {
  value: string;
}

export interface IEncryptResult {
  hash: string;
  salt: string;
}

export interface ICompareArgs {
  value: string;
  hash: string;
  salt: string;
}

export interface ICompareResult {
  matches: boolean;
}

export abstract class IEncrypter {
  abstract encrypt(args: IEncryptArgs): Promise<Result<IEncryptResult>>;
  abstract compare(args: ICompareArgs): Promise<Result<ICompareResult>>;
}
