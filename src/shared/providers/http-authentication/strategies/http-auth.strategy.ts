import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { EAuthStrategy } from 'src/shared/enums/auth-strategy.enum';
import { IHttpAuthentication } from '../http-authentication.interface';

@Injectable()
export class HttpAuthStrategy extends PassportStrategy(
  Strategy,
  EAuthStrategy.HTTP,
) {
  constructor(private readonly httpAuth: IHttpAuthentication) {
    super();
  }

  async validate(request: Request): Promise<boolean> {
    const [prefix, token] = (request.headers.authorization ?? '').split(' ');

    const httpAuthVerifyResult = await this.httpAuth.verify({
      prefix,
      token,
    });

    if (httpAuthVerifyResult.isError()) {
      return false;
    }
    const { loggedUserClaims } = httpAuthVerifyResult.value;
    Reflect.set(request, 'loggedUser', loggedUserClaims);

    return true;
  }
}
