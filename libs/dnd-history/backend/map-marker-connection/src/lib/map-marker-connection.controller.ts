import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
    MapMarkerConnection,
  MapMarkerConnectionDTO,
  MapMarker,
  MapMarkerDTO,
} from '@dnd-history/shared-interfaces';
import { MapMarkerConnectionService } from './map-marker-connection.service';
import { MapService } from '@dnd-history/backend-map';
import { UpdateResult } from 'typeorm';

@Controller()
export class MapMarkerConnectionController {
  constructor(
    private readonly mapMarkerConnectionService: MapMarkerConnectionService,
    private readonly mapService: MapService
  ) {}

  @Get('map/:mapId/mapMarkerConnection')
  async read(@Param('mapId') mapId: number): Promise<MapMarkerConnection[]> {
    const map = await this.mapService.find(mapId, ['mapMarkerConnections']);
    return map.mapMarkerConnections;
  }

  @Post('map/:mapId/mapMarkerConnection')
  async create(
    @Param('mapId') mapId: number,
    @Body() mapMarkerConnectionDTO: MapMarkerConnectionDTO
  ): Promise<MapMarkerConnection> {
    const map = await this.mapService.find(mapId);
    return this.mapMarkerConnectionService.create(map, mapMarkerConnectionDTO);
  }

  @Put('mapMarkerConnection/:mapMarkerConnectionId')
  update(
    @Param('mapMarker') mapMarkerId: number,
    @Body() mapMarkerConnectionDTO: MapMarkerConnectionDTO
  ): Promise<UpdateResult> {
    return this.mapMarkerConnectionService.update(mapMarkerId, mapMarkerConnectionDTO);
  }

}
