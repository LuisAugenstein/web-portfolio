import { PinPointEntity } from '@dnd-history/backend-entities';
import { MapModule } from '@dnd-history/backend-map';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinPointController } from './pin-point.controller';
import { PinPointService } from './pin-point.service';

@Module({
  imports: [TypeOrmModule.forFeature([PinPointEntity]), MapModule],
  providers: [PinPointService],
  controllers: [PinPointController],
})
export class PinPointModule {}
