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

  @Column({ nullable: false })
  title: string;

  @Column()
  text: string;

  @UpdateDateColumn()
  lastChangedAt: Date;

  @ManyToOne(() => SessionEntity, (session) => session.adventures)
  session: SessionEntity;
}
