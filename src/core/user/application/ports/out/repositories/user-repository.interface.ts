import { IUserProps, User, UserIdentifier } from 'src/core/user/domain';
import { AbstractRepository } from 'src/shared/interfaces';
import { Result } from 'src/shared/utils';

export abstract class IUserRepository extends AbstractRepository<
  User,
  UserIdentifier,
  IUserProps
> {
  abstract findByEmailOrSocialHandle(args: {
    email: string;
    socialHandle: string;
  }): Promise<Result<User>>;

  abstract findByEmail(email: string): Promise<Result<User>>;
}
