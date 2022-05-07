import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { Session, SessionModule } from '@dnd-history/backend-session';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.typeOrmModuleOptions,
      entities: [Session],
      synchronize: true
    }),
    SessionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
