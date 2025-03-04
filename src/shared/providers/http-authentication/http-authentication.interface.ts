import { Result } from 'src/shared/utils';

export interface ILoggedUser {
  id: number;
  email: string;
  name: string;
  socialHandle: string;
}

export interface ISignArgs {
  loggedUserClaims: ILoggedUser;
}

export interface ISignResult {
  token: string;
  prefix: string;
}

export interface IVerifyArgs {
  token: string;
  prefix: string;
}

export interface IVerifyResult {
  loggedUserClaims: ILoggedUser;
}

export abstract class IHttpAuthentication {
  abstract sign(args: ISignArgs): Promise<Result<ISignResult>>;
  abstract verify(args: IVerifyArgs): Promise<Result<IVerifyResult>>;
}
