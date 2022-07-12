import { Character, NanoId } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterEntity, SessionEntity } from '@dnd-history/backend-entities';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private characterRepository: Repository<CharacterEntity>
  ) {}

  async create(
    session: SessionEntity,
    character: Character
  ): Promise<Character> {
    const characterEntity = new CharacterEntity();
    characterEntity.id = character.id;
    characterEntity.name = character.name ?? '';
    characterEntity.type = character.type ?? '';
    characterEntity.description = character.description ?? '';
    characterEntity.session = session;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { session: _, ...remainingCharacter } =
      await this.characterRepository.save(characterEntity);
    return remainingCharacter;
  }

  async update(id: NanoId, character: Partial<Character>): Promise<Character> {
    const query = await this.characterRepository
      .createQueryBuilder()
      .update(character)
      .where({ id })
      .returning('*')
      .execute();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sessionId, ...remainingCharacter } = query.raw[0] as Character & {
      sessionId: NanoId;
    };
    return remainingCharacter;
  }
}
