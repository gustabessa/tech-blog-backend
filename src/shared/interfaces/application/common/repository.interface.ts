import { Result } from '../../../utils';
import { AggregateRoot } from '../../domain/agregate-root.interface';
import { Identifier, IdentifierTypes } from '../../domain/identifier.interface';

export abstract class Repository<
  TAggregateRoot extends AggregateRoot<
    TAggregateRootIdentifier,
    TAggregateRootProps
  >,
  TAggregateRootIdentifier extends Identifier<IdentifierTypes>,
  TAggregateRootProps,
> {
  abstract persist(
    aggregate: TAggregateRoot,
  ): Promise<Result<TAggregateRootIdentifier>>;

  abstract getById(
    id: TAggregateRootIdentifier,
  ): Promise<Result<TAggregateRoot>>;
}
