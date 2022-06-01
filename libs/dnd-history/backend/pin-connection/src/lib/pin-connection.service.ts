import { PinConnectionDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { MapEntity, PinConnectionEntity } from '@dnd-history/backend-entities';

@Injectable()
export class PinConnectionService {
  constructor(
    @InjectRepository(PinConnectionEntity)
    private pinConnectionRepository: Repository<PinConnectionEntity>
  ) {}

  create(
    map: MapEntity,
    pinConnectionDTO: PinConnectionDTO
  ): Promise<PinConnectionEntity> {
    const pinConnectionEntity = new PinConnectionEntity();
    pinConnectionEntity.sourcePinPointId = pinConnectionDTO.sourcePinPointId;
    pinConnectionEntity.destinationPinPointId =
      pinConnectionDTO.destinationPinPointId;
    pinConnectionEntity.layer = pinConnectionDTO.layer;
    pinConnectionEntity.map = map;
    return this.pinConnectionRepository.save(pinConnectionEntity);
  }

  update(
    pinConnectionId: number,
    pinConnectionDTO: PinConnectionDTO
  ): Promise<UpdateResult> {
    return this.pinConnectionRepository.update(
      pinConnectionId,
      pinConnectionDTO
    );
  }
}
