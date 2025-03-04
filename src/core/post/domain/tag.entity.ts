import { AbstractEntity, AbstractIdentifier } from 'src/shared/interfaces';
import { DateVO } from 'src/shared/utils';

export class TagIdentifier extends AbstractIdentifier<number> {}

export interface ITagProps {
  name: string;
  createdAt: DateVO | null;
  updatedAt: DateVO | null;
}

export class Tag extends AbstractEntity<TagIdentifier, ITagProps> {
  get id(): number | undefined {
    return this.identifier?.value;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): DateVO | null {
    return this.props.createdAt;
  }

  get updatedAt(): DateVO | null {
    return this.props.updatedAt;
  }

  private constructor(props: ITagProps, id?: TagIdentifier) {
    super(props, id);
  }

  static create(props: ITagProps, id?: TagIdentifier): Tag {
    return new Tag(props, id);
  }
}
