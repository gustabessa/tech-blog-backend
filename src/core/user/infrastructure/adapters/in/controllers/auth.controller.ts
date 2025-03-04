import { Body, Controller, Post } from '@nestjs/common';
import { ISignInUser } from 'src/core/user/application/ports/in/use-cases/sign-in-user.interface';
import { SignInUserDTO } from '../dtos/sign-in-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUser: ISignInUser) {}

  @Post('sign-in')
  signInUserFn(@Body() dto: SignInUserDTO) {
    return this.signInUser.execute(dto);
  }
}
