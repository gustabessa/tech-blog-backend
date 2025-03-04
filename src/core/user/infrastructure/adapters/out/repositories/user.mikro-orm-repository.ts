import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Injectable, Provider } from '@nestjs/common';
import { IUserRepository } from 'src/core/user/application/ports/out/repositories/user-repository.interface';
import { User, UserIdentifier } from 'src/core/user/domain';
import { Result, formatError } from 'src/shared/utils';
import { EApplicationErrorKind } from 'src/shared/utils/result/application-error-kind.enum';
import { UserMikroOrmEntity } from '../../../entities/user/user.mikro-orm-entity';
import { UserMapper } from '../../../mappers/user.mikro-orm-mapper';

@Injectable()
export class UserMikroOrmRepository implements IUserRepository {
  private readonly userRepository: EntityRepository<UserMikroOrmEntity>;

  constructor(
    private readonly em: EntityManager,
    private readonly userMapper: UserMapper,
  ) {
    this.userRepository = this.em.getRepository(UserMikroOrmEntity);
  }

  async persist(aggregate: User): Promise<Result<UserIdentifier>> {
    try {
      const userEntity = this.userMapper.toPersistence(aggregate);
      await this.em.persistAndFlush(userEntity);

      return Result.ok(new UserIdentifier(userEntity.id as number));
    } catch (error) {
      const { message, stackTrace } = formatError(error);
      return Result.error({
        message,
        stackTrace,
        errorKind: EApplicationErrorKind.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getById(id: UserIdentifier): Promise<Result<User>> {
    const user = await this.userRepository.findOne({
      id: id.value,
    });

    if (!user) {
      return Result.error({
        message: 'User not found.',
        errorKind: EApplicationErrorKind.RESOURCE_NOT_FOUND,
      });
    }

    return Result.ok(this.userMapper.toDomain(user));
  }

  async findByEmailOrSocialHandle(args: {
    email: string;
    socialHandle: string;
  }): Promise<Result<User>> {
    const { email, socialHandle } = args;
    const user = await this.userRepository.findOne({
      $or: [{ email }, { socialHandle }],
    });

    if (!user) {
      return Result.error({
        message: 'User not found.',
        errorKind: EApplicationErrorKind.RESOURCE_NOT_FOUND,
      });
    }

    return Result.ok(this.userMapper.toDomain(user));
  }

  async findByEmail(email: string): Promise<Result<User>> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      return Result.error({
        message: 'User not found.',
        errorKind: EApplicationErrorKind.RESOURCE_NOT_FOUND,
      });
    }

    return Result.ok(this.userMapper.toDomain(user));
  }
}

export const UserMikroOrmRepositoryProvider: Provider<IUserRepository> = {
  provide: IUserRepository,
  useClass: UserMikroOrmRepository,
};
