import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { SessionModule } from '@dnd-history/backend-session';
import { AdventureEntity, MapEntity, MapMarkerConnectionEntity, MapMarkerEntity, SessionEntity } from '@dnd-history/backend-entities';
import { AdventureModule } from '@dnd-history/backend-adventure';
import { MapModule} from '@dnd-history/backend-map';
import { MapMarkerModule } from '@dnd-history/backend-map-marker';
import { MapMarkerConnectionModule } from '@dnd-history/backend-map-marker-connection';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.typeOrmModuleOptions,
      entities: [SessionEntity, AdventureEntity, MapEntity, MapMarkerEntity, MapMarkerConnectionEntity],
    }),
    SessionModule,
    AdventureModule,
    MapModule,
    MapMarkerModule,
    MapMarkerConnectionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
