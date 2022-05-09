import { Environment } from "./environment.interface";

export const environment: Environment = {
  production: true,
  typeOrmModuleOptions: {
    type: 'postgres',
    host: process.env.POSTGRESS_HOST,
    port: parseInt(process.env.POSTGRESS_PORT),
    username: process.env.POSTGRESS_USER,
    password: process.env.POSTGRESS_PASSWORD,
    database: process.env.POSTGRESS_DATABASE,
    ssl: {
        require: true,
        rejectUnauthorized: false
    },
    synchronize: true
  }
};
