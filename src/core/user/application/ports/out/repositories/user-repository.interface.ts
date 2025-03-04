import { User, UserIdentifier, UserProps } from 'src/core/user/domain';
import { Repository } from 'src/shared/interfaces';
import { Result } from 'src/shared/utils';

export abstract class IUserRepository extends Repository<
  User,
  UserIdentifier,
  UserProps
> {
  abstract findByEmailOrSocialHandle(args: {
    email: string;
    socialHandle: string;
  }): Promise<Result<User>>;

  abstract findByEmail(email: string): Promise<Result<User>>;
}
