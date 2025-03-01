import { Result } from '../../utils';
import { AggregateRoot } from '../domain/agregate-root.interface';
import {
  AbstractIdentifier,
  IdentifierTypes,
} from '../domain/abstract-identifier.interface';

export abstract class Repository<
  TAggregateRoot extends AggregateRoot<
    TAggregateRootIdentifier,
    TAggregateRootProps
  >,
  TAggregateRootIdentifier extends AbstractIdentifier<IdentifierTypes>,
  TAggregateRootProps,
> {
  abstract persist(
    aggregate: TAggregateRoot,
  ): Promise<Result<TAggregateRootIdentifier>>;

  abstract getById(
    id: TAggregateRootIdentifier,
  ): Promise<Result<TAggregateRoot>>;
}
