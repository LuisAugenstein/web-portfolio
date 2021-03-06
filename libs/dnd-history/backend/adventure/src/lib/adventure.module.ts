import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdventureController } from './adventure.controller';
import { AdventureEntity } from '@dnd-history/backend-entities';
import { AdventureService } from './adventure.service';
import { SessionModule } from '@dnd-history/backend-session';

@Module({
  imports: [TypeOrmModule.forFeature([AdventureEntity]), SessionModule],
  providers: [AdventureService],
  controllers: [AdventureController],
})
export class AdventureModule {}
