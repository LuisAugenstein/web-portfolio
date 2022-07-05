import { Environment } from "./environment.interface";

export const environment: Environment = {
  production: false,
  typeOrmModuleOptions: {
    type: 'postgres',
    host: 'ec2-63-35-156-160.eu-west-1.compute.amazonaws.com',
    port: 5432,
    username: 'pivsonmhczousf',
    password: '2a4ca3129cec3cf0e7d7e25c1d4014c6a08692c2f468ac2990a1a5190499a1db',
    database: 'd6sujrvlaqnsje',
    ssl: {
        require: true,
        rejectUnauthorized: false
    },
    synchronize: true
  }
};
