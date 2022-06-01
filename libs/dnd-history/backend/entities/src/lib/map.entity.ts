import { SessionEntity } from './session.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { PinPointEntity } from './pin-point.entity';
import { PinConnectionEntity } from './pin-connection.entity';

@Entity()
export class MapEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  src: string;

  @OneToMany(() => PinPointEntity, pinPoint => pinPoint.map)
  pinPoints: PinPointEntity[];

  @OneToMany(() => PinConnectionEntity, pinConnection => pinConnection.map)
  pinConnections: PinConnectionEntity[];

  @ManyToOne(() => SessionEntity, (session) => session.maps)
  session: SessionEntity;
}
