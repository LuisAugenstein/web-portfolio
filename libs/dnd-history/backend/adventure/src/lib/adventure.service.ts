import { AdventureDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AdventureEntity, SessionEntity } from '@dnd-history/backend-entities';

@Injectable()
export class AdventureService {
  constructor(
    @InjectRepository(AdventureEntity)
    private adventureRepository: Repository<AdventureEntity>
  ) {}

  createAdventure(session: SessionEntity, adventureDTO: AdventureDTO): Promise<AdventureEntity> {
    const adventureEntity = new AdventureEntity();
    adventureEntity.title = adventureDTO.title;
    adventureEntity.content = adventureDTO.content;
    adventureEntity.session = session; 
    return this.adventureRepository.save(adventureEntity);
  }

  updateAdventure(adventureId: number, adventureDTO: AdventureDTO): Promise<UpdateResult> {
    return this.adventureRepository.update(adventureId, adventureDTO);
  }
}
