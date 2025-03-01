import {
  AbstractIdentifier,
  IdentifierTypes,
} from './abstract-identifier.interface';

export abstract class AbstractEntity<
  TId extends AbstractIdentifier<IdentifierTypes>,
  TProps,
> {
  protected readonly identifier?: TId;
  protected props: TProps;

  constructor(props: TProps, identifier?: TId) {
    this.identifier = identifier;
    this.props = props;
  }
}
