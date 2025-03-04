import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ISignInUserDTO } from 'src/core/user/application/ports/in/dtos/sign-in-user-dto.interface';

export class SignInUserDTO implements ISignInUserDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
