import { MapMarker, NanoId } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapEntity, MapMarkerEntity } from '@dnd-history/backend-entities';

@Injectable()
export class MapMarkerService {
  constructor(
    @InjectRepository(MapMarkerEntity)
    private mapMarkerRepository: Repository<MapMarkerEntity>
  ) {}

  create(map: MapEntity, mapMarker: MapMarker): Promise<MapMarkerEntity> {
    const mapMarkerEntity = new MapMarkerEntity();
    mapMarkerEntity.id = mapMarker.id;
    mapMarkerEntity.title = mapMarker.title;
    mapMarkerEntity.description = mapMarker.description;
    mapMarkerEntity.x = mapMarker.x;
    mapMarkerEntity.y = mapMarker.y;
    mapMarkerEntity.map = map;
    return this.mapMarkerRepository.save(mapMarkerEntity);
  }

  async update(id: NanoId, mapMarker: Partial<MapMarker>): Promise<MapMarker> {
    const query = await this.mapMarkerRepository
      .createQueryBuilder()
      .update(mapMarker)
      .where({ id })
      .returning('*')
      .execute();
    return query.raw[0];
  }
}
