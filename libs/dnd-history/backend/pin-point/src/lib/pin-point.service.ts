import { PinPointDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {
  MapEntity,
  PinPointEntity,

} from '@dnd-history/backend-entities';

@Injectable()
export class PinPointService {
  constructor(
    @InjectRepository(PinPointEntity)
    private pinPointRepository: Repository<PinPointEntity>
  ) {}

  create(map: MapEntity, pinPointDTO: PinPointDTO): Promise<PinPointEntity> {
    const pinPointEntity = new PinPointEntity();
    pinPointEntity.name = pinPointDTO.name;
    pinPointEntity.description = pinPointDTO.description;
    pinPointEntity.x = pinPointDTO.x;
    pinPointEntity.y = pinPointDTO.y;
    pinPointEntity.map = map;
    return this.pinPointRepository.save(pinPointEntity);
  }

  update(pinPointId: number, pinPointDTO: PinPointDTO): Promise<UpdateResult> {
    return this.pinPointRepository.update(pinPointId, pinPointDTO);
  }
}
