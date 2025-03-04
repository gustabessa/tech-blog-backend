import { AbstractValueObject } from 'src/shared/interfaces';

export interface IDateVOProps {
  date: Date;
}

export class DateVO extends AbstractValueObject<IDateVOProps> {
  get date(): Date {
    return this.props.date;
  }

  equals(vo: DateVO): boolean {
    return this.date.getTime() === vo.date.getTime();
  }
}
