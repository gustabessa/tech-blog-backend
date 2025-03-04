import { Result } from 'src/shared/utils';

export abstract class UseCase<TInput, TOutput> {
  abstract execute(dto: TInput): Result<TOutput> | Promise<Result<TOutput>>;
}
