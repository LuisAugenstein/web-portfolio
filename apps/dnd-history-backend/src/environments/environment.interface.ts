import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export interface Environment {
    production: boolean;
    typeOrmModuleOptions: TypeOrmModuleOptions
}
