import { Entity } from './entity';
import { Identifier, IdentifierTypes } from './identifier';

export abstract class AggregateRoot<
  TId extends Identifier<any>,
  TProps,
  TIdType extends IdentifierTypes,
> extends Entity<TId, TProps, TIdType> {}
