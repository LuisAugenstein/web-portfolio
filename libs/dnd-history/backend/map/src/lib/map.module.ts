import { MapEntity } from '@dnd-history/backend-entities';
import { SessionModule } from '@dnd-history/backend-session';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [TypeOrmModule.forFeature([MapEntity]), SessionModule],
  providers: [MapService],
  controllers: [MapController],
})
export class MapModule {}
