import { MapMarkerEntity } from '@dnd-history/backend-entities';
import { MapModule } from '@dnd-history/backend-map';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapMarkerController } from './map-marker.controller';
import { MapMarkerService } from './map-marker.service';

@Module({
  imports: [TypeOrmModule.forFeature([MapMarkerEntity]), MapModule],
  providers: [MapMarkerService],
  controllers: [MapMarkerController],
})
export class MapMarkerModule {}
