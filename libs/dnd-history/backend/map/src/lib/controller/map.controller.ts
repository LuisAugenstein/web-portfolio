import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Map, NanoId } from '@dnd-history/shared-interfaces';
import { MapService } from '../services/map.service';
import { SessionService } from '@dnd-history/backend-session';

@Controller()
export class MapController {
  constructor(
    private readonly mapService: MapService,
    private readonly sessionService: SessionService
  ) {}

  @Get('maps')
  async read(@Query('sessionId') sessionId: NanoId): Promise<Map[]> {
    const maps = (await this.sessionService.find(sessionId, ['maps'])).maps;
    const mapPromises = maps.map((map) =>
      this.mapService.find(map.id, ['mapMarkers', 'mapMarkerConnections'])
    );
    return Promise.all(mapPromises);
  }

  @Post('map')
  async create(
    @Query('sessionId') sessionId: NanoId,
    @Body() map: Map
  ): Promise<Map> {
    const session = await this.sessionService.find(sessionId);
    return this.mapService.create(session, map);
  }
}
