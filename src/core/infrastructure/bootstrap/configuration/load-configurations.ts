import { IAppConfigurations } from 'src/shared/interfaces';

export const loadConfigurations = (): IAppConfigurations => ({
  env: process.env.NODE_ENV as string,
  database: {
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    name: process.env.DATABASE_NAME as string,
    maxPool: process.env.DATABASE_MAX_POOL as string,
  },
  encrypter: {
    secret: process.env.ENCRYPTER_SECRET as string,
  },
});
