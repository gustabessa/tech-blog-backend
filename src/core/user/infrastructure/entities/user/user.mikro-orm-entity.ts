import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IUserMikroOrmEntity } from './user-mikro-orm-entity.interface';

@Entity({ tableName: 'users' })
export class UserMikroOrmEntity implements IUserMikroOrmEntity {
  @PrimaryKey()
  readonly id: number;

  @Property()
  name: string;

  @Property()
  socialHandle: string;

  @Property()
  email: string;

  @Property()
  password: string;

  constructor(dto: IUserMikroOrmEntity) {
    this.name = dto.name;
    this.socialHandle = dto.socialHandle;
    this.email = dto.email;
    this.password = dto.password;
  }
}
