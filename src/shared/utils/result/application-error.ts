import { EApplicationErrorKind } from './application-error-kind.enum';

const httpStatusByApplicationErrorKind: Record<EApplicationErrorKind, number> =
  {
    [EApplicationErrorKind.RESOURCE_NOT_FOUND]: 404,
    [EApplicationErrorKind.INTERNAL_SERVER_ERROR]: 500,
  };

export interface IApplicationErrorProps {
  message?: string;
  errorKind?: EApplicationErrorKind;
}

export class ApplicationError extends Error {
  errorKind: EApplicationErrorKind;

  constructor({
    message = 'Internal server error',
    errorKind = EApplicationErrorKind.INTERNAL_SERVER_ERROR,
  }: IApplicationErrorProps) {
    super(message);
    this.name = 'ApplicationError';
    this.errorKind = errorKind;
  }

  get httpStatus(): number {
    return httpStatusByApplicationErrorKind[this.errorKind] ?? 500;
  }
}
