import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from './result';

@Injectable()
export class TransformResultToHttpResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<T | HttpException> {
    return next.handle().pipe(
      map((result: T | Result<T>) => {
        if (result instanceof Result) {
          if (result.isError()) {
            return new HttpException(
              result.error.message,
              result.error.httpStatus,
            );
          }

          return result.value;
        }

        return result;
      }),
    );
  }
}
