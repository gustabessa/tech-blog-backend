import { UserIdentifier } from 'src/core/user/domain';
import { AbstractIdentifier, AggregateRoot } from 'src/shared/interfaces';
import { DateVO } from 'src/shared/utils';
import { Tag } from './tag.entity';

export class PostIdentifier extends AbstractIdentifier<number> {}

export interface IPostProps {
  title: string;
  content: string;
  authorId: UserIdentifier;
  tags: Tag[];
  createdAt: DateVO | null;
  updatedAt: DateVO | null;
}

export class Post extends AggregateRoot<PostIdentifier, IPostProps> {
  get id(): number | undefined {
    return this.identifier?.value;
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get authorId(): UserIdentifier {
    return this.props.authorId;
  }

  get tags(): Tag[] {
    return this.props.tags;
  }

  get createdAt(): DateVO | null {
    return this.props.createdAt;
  }

  get updatedAt(): DateVO | null {
    return this.props.updatedAt;
  }

  private constructor(props: IPostProps, id?: PostIdentifier) {
    super(props, id);
  }

  static create(props: IPostProps, id?: PostIdentifier): Post {
    return new Post(props, id);
  }
}
