import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { MapMarkerEntity } from './map-marker.entity';
import { MapMarkerConnectionEntity } from './map-marker-connection.entity';
import { SessionEntity } from './session.entity';

@Entity()
export class MapEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  src: string;
  @Column({ nullable: false })
  sortIndex: number;

  @OneToMany(() => MapMarkerEntity, (mapMarker) => mapMarker.map)
  mapMarkers: MapMarkerEntity[];

  @OneToMany(
    () => MapMarkerConnectionEntity,
    (mapMarkerConnection) => mapMarkerConnection.map
  )
  mapMarkerConnections: MapMarkerConnectionEntity[];

  @ManyToOne(() => SessionEntity, (session) => session.maps)
  session: SessionEntity;
}
