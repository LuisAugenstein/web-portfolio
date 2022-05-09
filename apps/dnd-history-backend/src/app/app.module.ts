import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { SessionEntity, SessionModule } from '@dnd-history/backend-session';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.typeOrmModuleOptions,
      entities: [SessionEntity],
      synchronize: true
    }),
    SessionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
