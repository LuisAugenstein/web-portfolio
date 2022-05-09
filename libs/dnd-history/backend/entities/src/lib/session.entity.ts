import { AdventureEntity } from './adventure.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => AdventureEntity, adventure => adventure.session)
  adventures: AdventureEntity[]
}
