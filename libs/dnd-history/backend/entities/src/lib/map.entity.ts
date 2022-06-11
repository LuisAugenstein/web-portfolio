import { SessionEntity } from './session.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { MapMarkerEntity } from './map-marker.entity';
import { MapMarkerConnectionEntity } from './map-marker-connection.entity';

@Entity()
export class MapEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  src: string;

  @OneToMany(() => MapMarkerEntity, mapMarker => mapMarker.map)
  mapMarkers: MapMarkerEntity[];

  @OneToMany(() => MapMarkerConnectionEntity, mapMarkerConnection => mapMarkerConnection.map)
  mapMarkerConnections: MapMarkerConnectionEntity[];

  @ManyToOne(() => SessionEntity, (session) => session.maps)
  session: SessionEntity;
}
