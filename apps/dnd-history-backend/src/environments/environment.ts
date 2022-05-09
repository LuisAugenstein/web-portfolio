import { Environment } from "./environment.interface";

export const environment: Environment = {
  production: false,
  typeOrmModuleOptions: {
    type: 'postgres',
    host: 'host',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'database',
    ssl: {
        require: true,
        rejectUnauthorized: false
    },
    synchronize: true
  }
};
