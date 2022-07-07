import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MapMarkerConnection, NanoId } from '@dnd-history/shared-interfaces';
import { MapMarkerConnectionService } from '../services/map-marker-connection.service';
import { UpdateResult } from 'typeorm';
import { MapService } from '../services/map.service';

@Controller()
export class MapMarkerConnectionController {
  constructor(
    private readonly mapMarkerConnectionService: MapMarkerConnectionService,
    private readonly mapService: MapService
  ) {}

  @Post('mapMarkerConnection')
  async create(
    @Query('mapId') mapId: NanoId,
    @Body() mapMarkerConnection: MapMarkerConnection
  ): Promise<MapMarkerConnection> {
    const map = await this.mapService.find(mapId);
    return this.mapMarkerConnectionService.create(map, mapMarkerConnection);
  }

  @Put('mapMarkerConnection/:mapMarkerConnectionId')
  update(
    @Param('mapMarker') mapMarkerId: NanoId,
    @Body() mapMarkerConnection: Partial<MapMarkerConnection>
  ): Promise<MapMarkerConnection> {
    return this.mapMarkerConnectionService.update(
      mapMarkerId,
      mapMarkerConnection
    );
  }
}
