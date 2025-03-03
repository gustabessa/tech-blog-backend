export interface IDatabaseConfigurations {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  maxPool: string;
}

export interface IEncrypterConfigurations {
  secret: string;
}

export interface IAuthenticationConfigurations {
  secret: string;
  expiresIn: string;
  prefix: string;
}

export interface IAppConfigurations {
  env: string;
  database: IDatabaseConfigurations;
  encrypter: IEncrypterConfigurations;
  authentication: IAuthenticationConfigurations;
}
