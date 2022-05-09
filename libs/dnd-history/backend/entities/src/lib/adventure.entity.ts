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
  constructor(params: { title: string, text: string, session: SessionEntity }) {
    this.title = params.title;
    this.text = params.text;
    this.session = params.session;
  }

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
