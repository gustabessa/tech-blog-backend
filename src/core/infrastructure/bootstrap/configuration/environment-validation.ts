import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class EnvironmentValidation {
  @IsIn(['development', 'production'])
  NODE_ENV!: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST!: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER!: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME!: string;

  @Type(() => Number)
  @IsNumber()
  DATABASE_PORT!: string;

  @IsString()
  @IsNotEmpty()
  ENCRYPTER_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  AUTHENTICATION_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  AUTHENTICATION_EXPIRES_IN!: string;

  @IsString()
  @IsNotEmpty()
  AUTHENTICATION_PREFIX!: string;
}
