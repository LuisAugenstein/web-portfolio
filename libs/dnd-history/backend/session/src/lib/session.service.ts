import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from '@dnd-history/backend-entities';
import { Session } from '@dnd-history/shared-interfaces';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>
  ) {}

  async create(session: Session): Promise<Session> {
    return this.sessionRepository.save(session);
  }

  async update(id: string, session: Partial<Session>): Promise<Session> {
    const query = await this.sessionRepository
      .createQueryBuilder()
      .update(session)
      .where({ id })
      .returning('*')
      .execute();
    console.log('query: ', query.raw[0]);
    return query.raw[0];
  }

  findAll(): Promise<SessionEntity[]> {
    return this.sessionRepository.find();
  }

  find(id: string, relations?: string[]): Promise<SessionEntity> {
    return this.sessionRepository.findOne(id, { relations });
  }
}
