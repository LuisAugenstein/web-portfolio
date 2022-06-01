import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';
  import { MapEntity } from './map.entity';
  
  @Entity()
  export class PinConnectionEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    sourcePinPointId: number;

    @Column()
    destinationPinPointId: number;

    @Column()
    layer: number
  
    @ManyToOne(() => MapEntity, (map) => map.pinConnections)
    map: MapEntity;
    
  }
  