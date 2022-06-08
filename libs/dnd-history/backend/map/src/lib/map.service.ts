import { MapDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MapEntity,
  SessionEntity,
} from '@dnd-history/backend-entities';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(MapEntity)
    private mapRepository: Repository<MapEntity>
  ) {}

  create(session: SessionEntity, mapDTO: MapDTO): Promise<MapEntity> {
    const mapEntity = new MapEntity();
    mapEntity.src = mapDTO.src;
    mapEntity.session = session;
    return this.mapRepository.save(mapEntity);
  }

  find(id: number, relations?: string[]): Promise<MapEntity> {
    return this.mapRepository.findOne(id, { relations });
  }
}
