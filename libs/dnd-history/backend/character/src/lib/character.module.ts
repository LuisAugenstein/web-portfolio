import { CharacterEntity } from '@dnd-history/backend-entities';
import { SessionModule } from '@dnd-history/backend-session';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity]), SessionModule],
  providers: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
