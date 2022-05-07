import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>
  ) {}

  findAll(): Promise<Session[]> {
    return this.sessionRepository.find();
  }

  findOne(session: Session): Promise<Session> {
    return this.sessionRepository.findOne(session);
  }

  save(session: Session): Promise<Session> {
    return this.sessionRepository.save(session);
  }
}
