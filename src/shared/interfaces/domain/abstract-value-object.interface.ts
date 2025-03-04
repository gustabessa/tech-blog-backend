export abstract class AbstractValueObject<TProps extends object> {
  protected readonly props: TProps;

  constructor(props: TProps) {
    this.props = Object.freeze(props);
  }

  abstract equals(vo: AbstractValueObject<TProps>): boolean;
}
