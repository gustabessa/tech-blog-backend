import { Entity } from './entity';
import { Identifier, IdentifierTypes } from './identifier';

export abstract class AggregateRoot<
  TId extends Identifier<IdentifierTypes>,
  TProps,
> extends Entity<TId, TProps> {}
