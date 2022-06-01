import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdventureEntity } from './adventure.entity';
import { MapEntity } from './map.entity';

@Entity()
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => AdventureEntity, adventure => adventure.session)
  adventures: AdventureEntity[]

  @OneToMany(() => MapEntity, map => map.session)
  maps: MapEntity[]
}
