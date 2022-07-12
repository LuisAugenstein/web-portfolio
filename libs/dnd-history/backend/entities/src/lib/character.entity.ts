import { SessionEntity } from './session.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class CharacterEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @ManyToOne(() => SessionEntity, (session) => session.characters)
  session: SessionEntity;
}
