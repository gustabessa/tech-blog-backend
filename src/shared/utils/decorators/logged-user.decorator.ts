import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ILoggedUser } from 'src/shared/providers/http-authentication';

export const LoggedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return Reflect.get(request, 'loggedUser') as ILoggedUser;
  },
);
