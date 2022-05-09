import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { SessionModule } from '@dnd-history/backend-session';
import { AdventureEntity, SessionEntity } from '@dnd-history/backend-entities';
import { AdventureModule } from '@dnd-history/backend-adventure';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.typeOrmModuleOptions,
      entities: [SessionEntity, AdventureEntity],
    }),
    SessionModule,
    AdventureModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
