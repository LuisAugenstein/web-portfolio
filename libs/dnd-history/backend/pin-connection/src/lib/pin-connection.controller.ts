import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
    PinConnection,
  PinConnectionDTO,
  PinPoint,
  PinPointDTO,
} from '@dnd-history/shared-interfaces';
import { PinConnectionService } from './pin-connection.service';
import { MapService } from '@dnd-history/backend-map';
import { UpdateResult } from 'typeorm';

@Controller()
export class PinConnectionController {
  constructor(
    private readonly pinConnectionService: PinConnectionService,
    private readonly mapService: MapService
  ) {}

  @Get('map/:mapId/pinConnection')
  async read(@Param('mapId') mapId: number): Promise<PinConnection[]> {
    const map = await this.mapService.find(mapId, ['pinConnections']);
    return map.pinConnections;
  }

  @Post('map/:mapId/pinConnection')
  async create(
    @Param('mapId') mapId: number,
    @Body() pinConnectionDTO: PinConnectionDTO
  ): Promise<PinConnection> {
    const map = await this.mapService.find(mapId);
    return this.pinConnectionService.create(map, pinConnectionDTO);
  }

  @Put('pinConnection/:pinConnectionId')
  update(
    @Param('pinPoint') pinPointId: number,
    @Body() pinConnectionDTO: PinConnectionDTO
  ): Promise<UpdateResult> {
    return this.pinConnectionService.update(pinPointId, pinConnectionDTO);
  }

}
