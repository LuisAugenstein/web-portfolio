import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  PinPoint,
  PinPointDTO,
} from '@dnd-history/shared-interfaces';
import { PinPointService } from './pin-point.service';
import { MapService } from '@dnd-history/backend-map';
import { UpdateResult } from 'typeorm';

@Controller()
export class PinPointController {
  constructor(
    private readonly pinPointService: PinPointService,
    private readonly mapService: MapService
  ) {}

  @Get('map/:mapId/pinPoint')
  async read(@Param('mapId') mapId: number): Promise<PinPoint[]> {
    const map = await this.mapService.find(mapId, ['pinPoints']);
    return map.pinPoints;
  }

  @Post('map/:mapId/pinPoint')
  async create(
    @Param('mapId') mapId: number,
    @Body() pinPointDTO: PinPointDTO
  ): Promise<PinPoint> {
    const map = await this.mapService.find(mapId);
    return this.pinPointService.create(map, pinPointDTO);
  }

  @Put('pinPoint/:pinPointId')
  update(
    @Param('pinPoint') pinPointId: number,
    @Body() pinPointDTO: PinPointDTO
  ): Promise<UpdateResult> {
    return this.pinPointService.update(pinPointId, pinPointDTO);
  }

}
