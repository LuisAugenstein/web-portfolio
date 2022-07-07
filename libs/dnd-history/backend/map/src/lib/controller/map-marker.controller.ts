import { Body, Controller, Param, Post, Put, Query } from '@nestjs/common';
import { MapMarker, NanoId } from '@dnd-history/shared-interfaces';
import { MapMarkerService } from '../services/map-marker.service';
import { MapService } from '../services/map.service';

@Controller()
export class MapMarkerController {
  constructor(
    private readonly mapMarkerService: MapMarkerService,
    private readonly mapService: MapService
  ) {}

  @Post('mapMarker')
  async create(
    @Query('mapId') mapId: NanoId,
    @Body() mapMarker: MapMarker
  ): Promise<MapMarker> {
    const map = await this.mapService.find(mapId);
    return this.mapMarkerService.create(map, mapMarker);
  }

  @Put('mapMarker/:mapMarkerId')
  update(
    @Param('mapMarkerId') mapMarkerId: NanoId,
    @Body() mapMarker: Partial<MapMarker>
  ): Promise<MapMarker> {
    return this.mapMarkerService.update(mapMarkerId, mapMarker);
  }
}
