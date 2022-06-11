import { MapMarkerConnectionDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { MapEntity, MapMarkerConnectionEntity } from '@dnd-history/backend-entities';

@Injectable()
export class MapMarkerConnectionService {
  constructor(
    @InjectRepository(MapMarkerConnectionEntity)
    private mapMarkerConnectionRepository: Repository<MapMarkerConnectionEntity>
  ) {}

  create(
    map: MapEntity,
    mapMarkerConnectionDTO: MapMarkerConnectionDTO
  ): Promise<MapMarkerConnectionEntity> {
    const mapMarkerConnectionEntity = new MapMarkerConnectionEntity();
    mapMarkerConnectionEntity.sourceMapMarkerId = mapMarkerConnectionDTO.sourceMapMarkerId;
    mapMarkerConnectionEntity.destinationMapMarkerId =
      mapMarkerConnectionDTO.destinationMapMarkerId;
    mapMarkerConnectionEntity.layer = mapMarkerConnectionDTO.layer;
    mapMarkerConnectionEntity.map = map;
    return this.mapMarkerConnectionRepository.save(mapMarkerConnectionEntity);
  }

  update(
    mapMarkerConnectionId: number,
    mapMarkerConnectionDTO: MapMarkerConnectionDTO
  ): Promise<UpdateResult> {
    return this.mapMarkerConnectionRepository.update(
      mapMarkerConnectionId,
      mapMarkerConnectionDTO
    );
  }
}
