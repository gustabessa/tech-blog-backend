export interface IUserMikroOrmEntity {
  id: number | undefined;
  name: string;
  socialHandle: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
