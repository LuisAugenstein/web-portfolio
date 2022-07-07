import { MapMarkerConnection, NanoId } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {
  MapEntity,
  MapMarkerConnectionEntity,
} from '@dnd-history/backend-entities';

@Injectable()
export class MapMarkerConnectionService {
  constructor(
    @InjectRepository(MapMarkerConnectionEntity)
    private mapMarkerConnectionRepository: Repository<MapMarkerConnectionEntity>
  ) {}

  create(
    map: MapEntity,
    mapMarkerConnection: MapMarkerConnection
  ): Promise<MapMarkerConnectionEntity> {
    const mapMarkerConnectionEntity = new MapMarkerConnectionEntity();
    mapMarkerConnectionEntity.id = mapMarkerConnection.id;
    mapMarkerConnectionEntity.sourceMapMarkerId =
      mapMarkerConnection.sourceMapMarkerId;
    mapMarkerConnectionEntity.destinationMapMarkerId =
      mapMarkerConnection.destinationMapMarkerId;
    mapMarkerConnectionEntity.layer = mapMarkerConnection.layer;
    mapMarkerConnectionEntity.map = map;
    return this.mapMarkerConnectionRepository.save(mapMarkerConnectionEntity);
  }

  async update(
    id: NanoId,
    mapMarkerConnection: Partial<MapMarkerConnection>
  ): Promise<MapMarkerConnection> {
    const query = await this.mapMarkerConnectionRepository
      .createQueryBuilder()
      .update(mapMarkerConnection)
      .where({ id })
      .returning('*')
      .execute();
    return query.raw[0];
  }
}
