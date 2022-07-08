import { Map, NanoId } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapEntity, SessionEntity } from '@dnd-history/backend-entities';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepository: Repository<MapEntity>
  ) {}

  async create(session: SessionEntity, map: Map): Promise<Map> {
    const mapEntity = new MapEntity();
    mapEntity.id = map.id;
    mapEntity.src = map.src;
    mapEntity.sortIndex = map.sortIndex;
    mapEntity.mapMarkers = [];
    mapEntity.mapMarkerConnections = [];
    mapEntity.session = session;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {session: _, ...remainingMap} = await this.mapRepository.save(mapEntity);
    return remainingMap;
  }

  async update(id: NanoId, map: Partial<Map>): Promise<Map> {
    const query = await this.mapRepository
      .createQueryBuilder()
      .update(map)
      .where({ id })
      .returning('*')
      .execute();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {sessionId, ...remainingMap} = query.raw[0];
    return remainingMap;
  }

  find(id: NanoId, relations?: string[]): Promise<MapEntity> {
    return this.mapRepository.findOne(id, { relations });
  }
}
