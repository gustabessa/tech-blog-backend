export interface IUserMikroOrmEntity {
  id: number | null;
  name: string;
  socialHandle: string;
  email: string;
  password: string;
  salt: string;
}
