import { Result } from '../../utils';
import { AggregateRoot } from './agregate-root';
import { Identifier, IdentifierTypes } from './identifier';

export abstract class Repository<
  TAggregateRoot extends AggregateRoot<
    TAggregateRootIdentifier,
    TAggregateRootProps
  >,
  TAggregateRootIdentifier extends Identifier<IdentifierTypes>,
  TAggregateRootProps,
> {
  abstract persist(aggregate: TAggregateRoot): Promise<Result<void>>;

  abstract getById(
    id: TAggregateRootIdentifier,
  ): Promise<Result<TAggregateRoot>>;
}
