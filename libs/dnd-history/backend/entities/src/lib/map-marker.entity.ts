import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { MapEntity } from './map.entity';

@Entity()
export class MapMarkerEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @ManyToOne(() => MapEntity, (map) => map.mapMarkers)
  map: MapEntity;
}
