import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { MapEntity } from './map.entity';

@Entity()
export class MapMarkerConnectionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  sourceMapMarkerId: string;

  @Column()
  destinationMapMarkerId: string;

  @Column()
  layer: number;

  @ManyToOne(() => MapEntity, (map) => map.mapMarkerConnections)
  map: MapEntity;
}
