import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IUserMikroOrmEntity } from './user-mikro-orm-entity.interface';

@Entity({ tableName: 'users' })
export class UserMikroOrmEntity implements IUserMikroOrmEntity {
  @PrimaryKey()
  readonly id!: number;

  @Property()
  name: string;

  @Property()
  socialHandle: string;

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  salt: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;

  constructor(dto: IUserMikroOrmEntity) {
    this.name = dto.name;
    this.socialHandle = dto.socialHandle;
    this.email = dto.email;
    this.password = dto.password;
    this.salt = dto.salt;
  }
}
