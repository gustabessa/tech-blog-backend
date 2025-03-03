import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ICreateUserDTO } from 'src/core/user/application';
import { IsStrongPassword } from 'src/shared/utils';

export class CreateUserDTO implements ICreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Matches(/@{1}[\w]+/, {
    message:
      'Social handle must start with "@" and contain only alphanumeric characters, e.g., @johndoe123',
  })
  @MinLength(4)
  @MaxLength(20)
  socialHandle: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
