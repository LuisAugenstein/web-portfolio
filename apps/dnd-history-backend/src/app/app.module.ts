import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { SessionModule } from '@dnd-history/backend-session';
import {
  AdventureEntity,
  CharacterEntity,
  MapEntity,
  MapMarkerConnectionEntity,
  MapMarkerEntity,
  SessionEntity,
} from '@dnd-history/backend-entities';
import { AdventureModule } from '@dnd-history/backend-adventure';
import { MapModule } from '@dnd-history/backend-map';
import { CharacterModule } from '@dnd-history/backend-character';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.typeOrmModuleOptions,
      entities: [
        SessionEntity,
        AdventureEntity,
        CharacterEntity,
        MapEntity,
        MapMarkerEntity,
        MapMarkerConnectionEntity,
      ],
    }),
    SessionModule,
    AdventureModule,
    CharacterModule,
    MapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
