import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SessionEntity } from '@dnd-history/backend-entities';
import { Session } from '@dnd-history/shared-interfaces';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>
  ) {}

  findAllSessions(): Promise<SessionEntity[]> {
    return this.sessionRepository.find();
  }

  createSession(session: Session): Promise<SessionEntity> {
    return this.sessionRepository.save(session);
  }

  updateSession(id: string, session: Partial<Session>): Promise<UpdateResult> {
    return this.sessionRepository.update(id, session);
  }

  find(id: string, relations?: string[]): Promise<SessionEntity> {
    return this.sessionRepository.findOne(id, { relations });
  }
}
