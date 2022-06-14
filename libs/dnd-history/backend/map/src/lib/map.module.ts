import {
  MapEntity,
  MapMarkerConnectionEntity,
  MapMarkerEntity,
} from '@dnd-history/backend-entities';
import { SessionModule } from '@dnd-history/backend-session';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapMarkerConnectionController } from './controller/map-marker-connection.controller';
import { MapMarkerController } from './controller/map-marker.controller';
import { MapController } from './controller/map.controller';
import { MapMarkerConnectionService } from './services/map-marker-connection.service';
import { MapMarkerService } from './services/map-marker.service';
import { MapService } from './services/map.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MapEntity,
      MapMarkerEntity,
      MapMarkerConnectionEntity,
    ]),
    SessionModule,
  ],
  providers: [MapService, MapMarkerService, MapMarkerConnectionService],
  controllers: [MapController, MapMarkerController, MapMarkerConnectionController],
  exports: [MapService],
})
export class MapModule {}
