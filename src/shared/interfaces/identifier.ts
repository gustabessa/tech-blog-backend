import { ValueObject } from './value-object';

export type IdentifierTypes = string | number | null;
interface IdentifierVoProps<TIdType extends IdentifierTypes> {
  _id: TIdType;
}

export abstract class Identifier<
  TIdType extends IdentifierTypes,
> extends ValueObject<IdentifierVoProps<TIdType>> {
  constructor(id: TIdType) {
    super({ _id: id });
  }

  get value(): TIdType {
    return this._props._id;
  }

  equals(vo: Identifier<TIdType>): boolean {
    if (this.value === null || vo.value === null) {
      return false;
    }

    if (!(vo instanceof this.constructor)) {
      return false;
    }

    return this.value === vo.value;
  }
}
