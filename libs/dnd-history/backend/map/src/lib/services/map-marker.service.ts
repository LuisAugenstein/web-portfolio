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

  async create(map: MapEntity, mapMarker: MapMarker): Promise<MapMarker> {
    const mapMarkerEntity = new MapMarkerEntity();
    mapMarkerEntity.id = mapMarker.id;
    mapMarkerEntity.title = mapMarker.title;
    mapMarkerEntity.description = mapMarker.description;
    mapMarkerEntity.x = mapMarker.x;
    mapMarkerEntity.y = mapMarker.y;
    mapMarkerEntity.map = map;
    const {map: _, ...remainingMapMarker} = await this.mapMarkerRepository.save(mapMarkerEntity);
    return remainingMapMarker;
  }

  async update(id: NanoId, mapMarker: Partial<MapMarker>): Promise<MapMarker> {
    const query = await this.mapMarkerRepository
      .createQueryBuilder()
      .update(mapMarker)
      .where({ id })
      .returning('*')
      .execute();
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const {mapId, ...remainingMapMarker} = query.raw[0];
     return remainingMapMarker;
  }
}
