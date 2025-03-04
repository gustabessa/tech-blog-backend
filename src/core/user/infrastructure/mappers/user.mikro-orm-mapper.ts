import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateVO } from 'src/shared/utils';
import { User, UserIdentifier } from '../../domain';
import { UserMikroOrmEntity } from '../entities/user/user.mikro-orm-entity';

@Injectable()
export class UserMapper {
  constructor(private readonly em: EntityManager) {}

  toDomain(user: UserMikroOrmEntity): User {
    return User.create(
      {
        name: user.name,
        socialHandle: user.socialHandle,
        email: user.email,
        password: user.password,
        salt: user.salt,
        createdAt: user.createdAt ? new DateVO({ date: user.createdAt }) : null,
        updatedAt: user.updatedAt ? new DateVO({ date: user.updatedAt }) : null,
      },
      user.id ? new UserIdentifier(user.id) : undefined,
    );
  }

  toPersistence(user: User): UserMikroOrmEntity {
    const userEntity = new UserMikroOrmEntity({
      id: user.id,
      name: user.name,
      socialHandle: user.socialHandle,
      email: user.email,
      password: user.password,
      salt: user.salt,
      createdAt: user.createdAt?.date ?? null,
      updatedAt: user.updatedAt?.date ?? null,
    });

    if (user.id) {
      this.em.merge(userEntity, { refresh: true });
    }

    return userEntity;
  }
}
