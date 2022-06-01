import { SessionDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SessionEntity } from '@dnd-history/backend-entities';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>
  ) {}

  findAllSessions(): Promise<SessionEntity[]> {
    return this.sessionRepository.find();
  }

  createSession(sessionDTO: SessionDTO): Promise<SessionEntity> {
    return this.sessionRepository.save(sessionDTO);
  }

  updateSession(id: number, sessionDTO: SessionDTO): Promise<UpdateResult> {
    return this.sessionRepository.update(id, sessionDTO);
  }

  find(id: number, relations?: string[]): Promise<SessionEntity> {
    return this.sessionRepository.findOne(id, { relations });
  }
}
