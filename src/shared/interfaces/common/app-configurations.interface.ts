export interface IDatabaseConfigurations {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  maxPool: string;
}

export interface IAppConfigurations {
  env: string;
  database: IDatabaseConfigurations;
}
