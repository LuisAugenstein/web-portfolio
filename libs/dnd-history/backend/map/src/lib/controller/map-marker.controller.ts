import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  MapMarker,
  MapMarkerDTO,
} from '@dnd-history/shared-interfaces';
import { MapMarkerService } from '../services/map-marker.service';
import { UpdateResult } from 'typeorm';
import { MapService } from '../services/map.service';


@Controller()
export class MapMarkerController {
  constructor(
    private readonly mapMarkerService: MapMarkerService,
    private readonly mapService: MapService
  ) {}

  @Post('map/:mapId/mapMarker')
  async create(
    @Param('mapId') mapId: number,
    @Body() mapMarkerDTO: MapMarkerDTO
  ): Promise<MapMarker> {
    const map = await this.mapService.find(mapId);
    return this.mapMarkerService.create(map, mapMarkerDTO);
  }

  @Patch('mapMarker/:mapMarkerId')
  update(
    @Param('mapMarker') mapMarkerId: number,
    @Body() mapMarkerDTO: Partial<MapMarkerDTO>
  ): Promise<UpdateResult> {
    return this.mapMarkerService.update(mapMarkerId, mapMarkerDTO);
  }

}
