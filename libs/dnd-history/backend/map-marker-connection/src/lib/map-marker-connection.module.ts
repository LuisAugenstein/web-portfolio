import { MapMarkerConnectionEntity } from '@dnd-history/backend-entities';
import { MapModule } from '@dnd-history/backend-map';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapMarkerConnectionController } from './map-marker-connection.controller';
import { MapMarkerConnectionService } from './map-marker-connection.service';

@Module({
  imports: [TypeOrmModule.forFeature([MapMarkerConnectionEntity]), MapModule],
  providers: [MapMarkerConnectionService],
  controllers: [MapMarkerConnectionController],
})
export class MapMarkerConnectionModule {}
