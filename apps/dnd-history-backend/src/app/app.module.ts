import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { SessionModule } from '@dnd-history/backend-session';
import { AdventureModule } from '@dnd-history/frontend-adventure';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.typeOrmModuleOptions,
      autoLoadEntities: true,
      synchronize: true
    }),
    SessionModule,
    AdventureModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
