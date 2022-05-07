import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmModuleOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'ec2-176-34-211-0.eu-west-1.compute.amazonaws.com',
    port: 5432,
    username: 'venzsnzghoqsiy',
    password: 'da9ca980f7aba4490268376bbb6071a4242aea1634c19c04971c4c2119775190',
    database: 'd368kqtjp3rtn',
    ssl: {
        require: true,
        rejectUnauthorized: false
    },
    synchronize: true
};

export default typeOrmModuleOptions;