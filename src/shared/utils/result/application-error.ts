import { EApplicationErrorKind } from './application-error-kind.enum';

export interface IApplicationErrorProps {
  message?: string;
  errorKind?: EApplicationErrorKind;
}

export class ApplicationError extends Error {
  errorKind: EApplicationErrorKind;

  constructor({
    message = 'Internal server error',
    errorKind = EApplicationErrorKind.UNKNOWN_ERROR,
  }: IApplicationErrorProps) {
    super(message);
    this.name = 'ApplicationError';
    this.errorKind = errorKind;
  }
}
