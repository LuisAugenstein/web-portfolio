import { Adventure } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdventureEntity, SessionEntity } from '@dnd-history/backend-entities';

@Injectable()
export class AdventureService {
  constructor(
    @InjectRepository(AdventureEntity)
    private adventureRepository: Repository<AdventureEntity>
  ) {}

  create(
    session: SessionEntity,
    adventure: Adventure
  ): Promise<AdventureEntity> {
    const adventureEntity = new AdventureEntity();
    adventureEntity.id = adventure.id;
    adventureEntity.title = adventure.title ?? '';
    adventureEntity.content = adventure.content ?? '';
    adventureEntity.createdAt = adventure.createdAt ?? new Date();
    adventureEntity.session = session;
    return this.adventureRepository.save(adventureEntity);
  }

  async update(id: string, adventure: Adventure): Promise<Adventure> {
    const query = await this.adventureRepository
      .createQueryBuilder()
      .update(adventure)
      .where({ id })
      .returning('*')
      .execute();
    return query.raw[0];
  }
}
