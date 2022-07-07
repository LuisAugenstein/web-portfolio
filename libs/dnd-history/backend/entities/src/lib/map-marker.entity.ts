import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';
  import { MapEntity } from './map.entity';
  
  @Entity()
  export class MapMarkerEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
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
  