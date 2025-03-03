import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { ICreateUser } from 'src/core/user/application';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: ICreateUser) {}

  @Post('')
  async createUserFn(@Body() dto: CreateUserDTO) {
    return this.createUser.execute(dto);
  }
}
