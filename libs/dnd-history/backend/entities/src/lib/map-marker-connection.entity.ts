import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';
  import { MapEntity } from './map.entity';
  
  @Entity()
  export class MapMarkerConnectionEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    sourceMapMarkerId: number;

    @Column()
    destinationMapMarkerId: number;

    @Column()
    layer: number
  
    @ManyToOne(() => MapEntity, (map) => map.mapMarkerConnections)
    map: MapEntity;
    
  }
  