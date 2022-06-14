import { MapDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MapEntity,
  SessionEntity,
} from '@dnd-history/backend-entities';
import { MapMarkerService } from './map-marker.service';
import { MapMarkerConnectionService } from './map-marker-connection.service';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepository: Repository<MapEntity>,
    private readonly mapMarkerService: MapMarkerService,
    private readonly mapMarkerConnectionService: MapMarkerConnectionService

  ) {}

  create(session: SessionEntity, mapDTO: MapDTO): Promise<MapEntity> {
    const mapEntity = new MapEntity();
    mapEntity.src = mapDTO.src;
    mapEntity.mapMarkers = [];
    mapEntity.mapMarkerConnections = [];
    mapEntity.session = session;
    return this.mapRepository.save(mapEntity);
  }

  find(id: number, relations?: string[]): Promise<MapEntity> {
    return this.mapRepository.findOne(id, { relations });
  }
}
