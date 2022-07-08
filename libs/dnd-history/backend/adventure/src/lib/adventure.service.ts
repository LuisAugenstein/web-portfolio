import { Adventure, NanoId } from '@dnd-history/shared-interfaces';
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

  async create(
    session: SessionEntity,
    adventure: Adventure
  ): Promise<Adventure> {
    const adventureEntity = new AdventureEntity();
    adventureEntity.id = adventure.id;
    adventureEntity.title = adventure.title ?? '';
    adventureEntity.content = adventure.content ?? '';
    adventureEntity.createdAt = adventure.createdAt ?? new Date();
    adventureEntity.session = session;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { session: _, ...remainingAdventure } =
      await this.adventureRepository.save(adventureEntity);
    return remainingAdventure;
  }

  async update(id: NanoId, adventure: Partial<Adventure>): Promise<Adventure> {
    const query = await this.adventureRepository
      .createQueryBuilder()
      .update(adventure)
      .where({ id })
      .returning('*')
      .execute();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sessionId, ...remainingAdventure } = query.raw[0] as Adventure & {
      sessionId: NanoId;
    };
    return remainingAdventure;
  }
}
