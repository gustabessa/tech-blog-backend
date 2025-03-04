import { AbstractIdentifier, AggregateRoot } from 'src/shared/interfaces';

export class UserIdentifier extends AbstractIdentifier<number> {}

export interface UserProps {
  name: string;
  socialHandle: string;
  email: string;
  password: string;
  salt: string;
}

export class User extends AggregateRoot<UserIdentifier, UserProps> {
  get id(): number | null {
    return this.identifier?.value ?? null;
  }

  get name(): string {
    return this.props.name;
  }

  get socialHandle(): string {
    return this.props.socialHandle;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get salt(): string {
    return this.props.salt;
  }

  private constructor(props: UserProps, id?: UserIdentifier) {
    super(props, id);
  }

  static create(props: UserProps, id?: UserIdentifier): User {
    return new User(props, id);
  }
}
