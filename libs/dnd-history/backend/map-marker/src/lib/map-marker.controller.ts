import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  MapMarker,
  MapMarkerDTO,
} from '@dnd-history/shared-interfaces';
import { MapMarkerService } from './map-marker.service';
import { MapService } from '@dnd-history/backend-map';
import { UpdateResult } from 'typeorm';

@Controller()
export class MapMarkerController {
  constructor(
    private readonly mapMarkerService: MapMarkerService,
    private readonly mapService: MapService
  ) {}

  @Get('map/:mapId/mapMarker')
  async read(@Param('mapId') mapId: number): Promise<MapMarker[]> {
    const map = await this.mapService.find(mapId, ['mapMarkers']);
    return map.mapMarkers;
  }

  @Post('map/:mapId/mapMarker')
  async create(
    @Param('mapId') mapId: number,
    @Body() mapMarkerDTO: MapMarkerDTO
  ): Promise<MapMarker> {
    const map = await this.mapService.find(mapId);
    return this.mapMarkerService.create(map, mapMarkerDTO);
  }

  @Put('mapMarker/:mapMarkerId')
  update(
    @Param('mapMarker') mapMarkerId: number,
    @Body() mapMarkerDTO: MapMarkerDTO
  ): Promise<UpdateResult> {
    return this.mapMarkerService.update(mapMarkerId, mapMarkerDTO);
  }

}
