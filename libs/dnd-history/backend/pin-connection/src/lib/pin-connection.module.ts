import { PinConnectionEntity } from '@dnd-history/backend-entities';
import { MapModule } from '@dnd-history/backend-map';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinConnectionController } from './pin-connection.controller';
import { PinConnectionService } from './pin-connection.service';

@Module({
  imports: [TypeOrmModule.forFeature([PinConnectionEntity]), MapModule],
  providers: [PinConnectionService],
  controllers: [PinConnectionController],
})
export class PinConnectionModule {}
