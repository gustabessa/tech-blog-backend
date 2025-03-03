import { EApplicationErrorKind } from './application-error-kind.enum';

const httpStatusByApplicationErrorKind: Record<EApplicationErrorKind, number> =
  {
    [EApplicationErrorKind.UNAUTHORIZED]: 401,
    [EApplicationErrorKind.RESOURCE_NOT_FOUND]: 404,
    [EApplicationErrorKind.CONFLICT]: 409,
    [EApplicationErrorKind.INTERNAL_SERVER_ERROR]: 500,
  };

export interface IApplicationErrorProps {
  message?: string;
  stackTrace?: string;
  errorKind?: EApplicationErrorKind;
}

export class ApplicationError extends Error {
  errorKind: EApplicationErrorKind;

  constructor({
    message = 'Internal server error',
    errorKind = EApplicationErrorKind.INTERNAL_SERVER_ERROR,
    stackTrace,
  }: IApplicationErrorProps) {
    super(message);
    this.name = 'ApplicationError';
    this.errorKind = errorKind;
    this.stack = stackTrace ?? this.stack;
  }

  copyWith(error: Partial<IApplicationErrorProps>) {
    return new ApplicationError({
      message: error.message ?? this.message,
      errorKind: error.errorKind ?? this.errorKind,
      stackTrace: error.stackTrace ?? this.stack,
    });
  }

  get httpStatus(): number {
    return httpStatusByApplicationErrorKind[this.errorKind] ?? 500;
  }
}
