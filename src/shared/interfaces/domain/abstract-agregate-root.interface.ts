import { AbstractEntity } from './abstract-entity.interface';
import {
  AbstractIdentifier,
  IdentifierTypes,
} from './abstract-identifier.interface';

export abstract class AggregateRoot<
  TId extends AbstractIdentifier<IdentifierTypes>,
  TProps,
> extends AbstractEntity<TId, TProps> {}
