import { Entity } from './entity.interface';
import { Identifier, IdentifierTypes } from './identifier.interface';

export abstract class AggregateRoot<
  TId extends Identifier<IdentifierTypes>,
  TProps,
> extends Entity<TId, TProps> {}
