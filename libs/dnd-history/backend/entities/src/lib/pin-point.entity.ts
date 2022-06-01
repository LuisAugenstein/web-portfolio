import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';
  import { MapEntity } from './map.entity';
  
  @Entity()
  export class PinPointEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    x: number;

    @Column()
    y: number;
  
    @ManyToOne(() => MapEntity, (map) => map.pinPoints)
    map: MapEntity;
  }
  