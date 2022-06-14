import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  MapMarkerConnection,
  MapMarkerConnectionDTO,
} from '@dnd-history/shared-interfaces';
import { MapMarkerConnectionService } from '../services/map-marker-connection.service';
import { UpdateResult } from 'typeorm';
import { MapService } from '../services/map.service';

@Controller()
export class MapMarkerConnectionController {
  constructor(
    private readonly mapMarkerConnectionService: MapMarkerConnectionService,
    private readonly mapService: MapService
  ) {}

  @Post('map/:mapId/mapMarkerConnection')
  async create(
    @Param('mapId') mapId: number,
    @Body() mapMarkerConnectionDTO: MapMarkerConnectionDTO
  ): Promise<MapMarkerConnection> {
    const map = await this.mapService.find(mapId);
    return this.mapMarkerConnectionService.create(map, mapMarkerConnectionDTO);
  }

  @Patch('mapMarkerConnection/:mapMarkerConnectionId')
  update(
    @Param('mapMarker') mapMarkerId: number,
    @Body() mapMarkerConnectionDTO: Partial<MapMarkerConnectionDTO>
  ): Promise<UpdateResult> {
    return this.mapMarkerConnectionService.update(
      mapMarkerId,
      mapMarkerConnectionDTO
    );
  }
}
