
import { SessionEntity } from './session.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AdventureEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @UpdateDateColumn()
  lastChangedAt: Date;

  @ManyToOne(() => SessionEntity, (session) => session.adventures)
  session: SessionEntity;
}
