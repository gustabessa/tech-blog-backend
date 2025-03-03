import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from './result';
import { Response } from 'express';

interface HttpExceptionResponse {
  statusCode: number;
  message: string;
}

@Injectable()
export class TransformResultToHttpResponseInterceptor<TResultData>
  implements NestInterceptor<TResultData, TResultData | HttpExceptionResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TResultData | HttpExceptionResponse> {
    return next.handle().pipe(
      map((result: TResultData | Result<TResultData>) => {
        if (result instanceof Result) {
          if (result.isError()) {
            const response = context.switchToHttp().getResponse<Response>();

            response.status(result.error.httpStatus);
            return {
              statusCode: result.error.httpStatus,
              message: result.error.message,
            };
          }

          return result.value;
        }

        return result;
      }),
    );
  }
}
