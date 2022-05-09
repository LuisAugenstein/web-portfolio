import { Session, SessionDTO } from '@dnd-history/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>
  ) {}

  findAllSessions(): Promise<Session[]> {
    return this.sessionRepository.find();
  }

  createSession(sessionDTO: SessionDTO): Promise<Session> {
    return this.sessionRepository.save(sessionDTO);
  }

  updateSession(id: number, sessionDTO: SessionDTO): Promise<UpdateResult> {
    return this.sessionRepository.update(id, sessionDTO);
  }
}
