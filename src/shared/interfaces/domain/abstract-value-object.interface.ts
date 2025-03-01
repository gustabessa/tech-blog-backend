export abstract class AbstractValueObject<TProps extends object> {
  protected readonly _props: TProps;

  constructor(props: TProps) {
    this._props = Object.freeze(props);
  }

  public getProps(): TProps {
    return this._props;
  }

  abstract equals(vo: AbstractValueObject<TProps>): boolean;
}
