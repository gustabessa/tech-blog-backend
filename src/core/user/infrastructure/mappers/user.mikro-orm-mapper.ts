import { User, UserIdentifier } from '../../domain';
import { UserMikroOrmEntity } from '../entities/user/user.mikro-orm-entity';

export class UserMapper {
  static toDomain(user: UserMikroOrmEntity): User {
    return User.create(
      {
        name: user.name,
        socialHandle: user.socialHandle,
        email: user.email,
        password: user.password,
        salt: user.salt,
      },
      new UserIdentifier(user.id),
    );
  }

  static toPersistence(user: User): UserMikroOrmEntity {
    return new UserMikroOrmEntity({
      id: user.id,
      name: user.name,
      socialHandle: user.socialHandle,
      email: user.email,
      password: user.password,
      salt: user.salt,
    });
  }
}
