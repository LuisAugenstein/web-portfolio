
import { SessionEntity } from './session.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AdventureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @UpdateDateColumn()
  lastChangedAt: Date;

  @ManyToOne(() => SessionEntity, (session) => session.adventures)
  session: SessionEntity;
}
