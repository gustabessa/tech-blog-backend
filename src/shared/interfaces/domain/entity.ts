import { Identifier, IdentifierTypes } from './identifier';

export abstract class Entity<TId extends Identifier<IdentifierTypes>, TProps> {
  protected readonly id?: TId;
  protected props: TProps;

  constructor(props: TProps, id?: TId) {
    this.id = id;
    this.props = props;
  }
}
