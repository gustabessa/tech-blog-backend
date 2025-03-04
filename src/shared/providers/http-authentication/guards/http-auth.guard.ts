import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EAuthStrategy } from 'src/shared/enums/auth-strategy.enum';

@Injectable()
export class HttpAuthGuard extends AuthGuard(EAuthStrategy.HTTP) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
