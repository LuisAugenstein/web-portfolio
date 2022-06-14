import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Map, MapDTO} from '@dnd-history/shared-interfaces';
import { MapService } from '../services/map.service';

import { SessionService } from '@dnd-history/backend-session';

@Controller()
export class MapController {
  constructor(
    private readonly mapService: MapService,
    private readonly sessionService: SessionService
  ) {}

  @Get('session/:sessionId/map')
  async read(@Param('sessionId') sessionId: number): Promise<Map[]> {
    const maps = (await this.sessionService.find(sessionId, ['maps'])).maps;
    const mapPromises = maps.map(map => this.mapService.find(map.id, ['mapMarkers', 'mapMarkerConnections']));
    return Promise.all(mapPromises);
  }

  @Post('session/:sessionId/map')
  async create(
    @Param('sessionId') sessionId: number,
    @Body() mapDTO: MapDTO
  ): Promise<Map> {
    const session = await this.sessionService.find(sessionId);
    return this.mapService.create(session, mapDTO);
  }
}
