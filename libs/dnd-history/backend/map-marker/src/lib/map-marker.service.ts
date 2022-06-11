import { MapMarkerDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {
  MapEntity,
  MapMarkerEntity,

} from '@dnd-history/backend-entities';

@Injectable()
export class MapMarkerService {
  constructor(
    @InjectRepository(MapMarkerEntity)
    private mapMarkerRepository: Repository<MapMarkerEntity>
  ) {}

  create(map: MapEntity, mapMarkerDTO: MapMarkerDTO): Promise<MapMarkerEntity> {
    const mapMarkerEntity = new MapMarkerEntity();
    mapMarkerEntity.name = mapMarkerDTO.name;
    mapMarkerEntity.description = mapMarkerDTO.description;
    mapMarkerEntity.x = mapMarkerDTO.x;
    mapMarkerEntity.y = mapMarkerDTO.y;
    mapMarkerEntity.map = map;
    return this.mapMarkerRepository.save(mapMarkerEntity);
  }

  update(mapMarkerId: number, mapMarkerDTO: MapMarkerDTO): Promise<UpdateResult> {
    return this.mapMarkerRepository.update(mapMarkerId, mapMarkerDTO);
  }
}
