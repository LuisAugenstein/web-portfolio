import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmModuleOptions: TypeOrmModuleOptions = {
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
};

export default typeOrmModuleOptions;