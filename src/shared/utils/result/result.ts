import { ApplicationError, IApplicationErrorProps } from './application-error';

interface ResultDTO<TResultValue> {
  value: TResultValue;
  error: ApplicationError | null;
  isError: boolean;
}

export type ResultError = Result<never> & {
  error: ApplicationError;
};

export class Result<TResultValue> {
  readonly value: TResultValue;
  readonly error: ApplicationError | null = null;
  private readonly _isError: boolean;

  constructor({ value, error, isError }: ResultDTO<TResultValue>) {
    this.value = value;
    this.error = error;
    this._isError = isError;
  }

  isOk(): boolean {
    return !this._isError;
  }

  isError(): this is ResultError {
    return this._isError;
  }

  copyWith(error: Partial<IApplicationErrorProps>) {
    if (this.isError()) {
      return Result.error<TResultValue>(this.error.copyWith(error));
    }
    return this;
  }

  mapOk<TNewResultValue>(
    mapResultFn: (value: TResultValue) => TNewResultValue,
  ): Result<TNewResultValue> {
    return this.isError() ? this : Result.ok(mapResultFn(this.value));
  }

  static ok<TResultValue = void>(arg?: TResultValue): Result<TResultValue> {
    return new Result({
      value: arg as TResultValue,
      error: null,
      isError: false,
    });
  }

  static error<T>(error: string): Result<T>;
  static error<T>(error: Partial<IApplicationErrorProps>): Result<T>;
  static error<T>(error: string | Partial<IApplicationErrorProps>): Result<T> {
    if (typeof error === 'string') {
      return new Result({
        value: null as T,
        error: new ApplicationError({ message: error }),
        isError: true,
      });
    }
    return new Result({
      value: null as T,
      error: new ApplicationError(error),
      isError: true,
    });
  }
}
