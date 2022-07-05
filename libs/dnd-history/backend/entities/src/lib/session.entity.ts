
// import { AdventureEntity } from './adventure.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
// import { MapEntity } from './map.entity';


@Entity()
export class SessionEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  // @OneToMany(() => AdventureEntity, adventure => adventure.session)
  // adventures: AdventureEntity[]

  // @OneToMany(() => MapEntity, map => map.session)
  // maps: MapEntity[]
}
