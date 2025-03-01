export abstract class ValueObject<TProps extends object> {
  protected readonly _props: TProps;

  constructor(props: TProps) {
    this._props = Object.freeze(props);
  }

  public getValue(): TProps {
    return this._props;
  }

  abstract equals(vo: ValueObject<TProps>): boolean;
}
