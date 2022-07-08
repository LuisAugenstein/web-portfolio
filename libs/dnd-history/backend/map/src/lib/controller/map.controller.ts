import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ID,
  Map as IMap,
  MapMarker,
  MapMarkerConnection,
  NanoId,
} from '@dnd-history/shared-interfaces';
import { MapService } from '../services/map.service';
import { SessionService } from '@dnd-history/backend-session';
import { MapMarkerService } from '../services/map-marker.service';
import { MapMarkerConnectionService } from '../services/map-marker-connection.service';

interface Service<T, K> {
  create(parent: T, entity: K): Promise<K>;
  update(id: NanoId, entity: K): Promise<K>;
}

@Controller()
export class MapController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly mapService: MapService,
    private readonly mapMarkerService: MapMarkerService,
    private readonly mapMarkerConnectionService: MapMarkerConnectionService
  ) {}

  @Get('maps')
  async read(@Query('sessionId') sessionId: NanoId): Promise<IMap[]> {
    const maps = (await this.sessionService.find(sessionId, ['maps'])).maps;
    const mapPromises = maps.map((map) =>
      this.mapService.find(map.id, ['mapMarkers', 'mapMarkerConnections'])
    );
    return Promise.all(mapPromises);
  }

  @Post('map')
  async create(
    @Query('sessionId') sessionId: NanoId,
    @Body() map: IMap
  ): Promise<IMap> {
    const session = await this.sessionService.find(sessionId);
    return this.mapService.create(session, map);
  }

  @Put('map/:mapId')
  async update(
    @Param('mapId') mapId: NanoId,
    @Body() { mapMarkers, mapMarkerConnections, ...remainingMap }: Partial<IMap>
  ): Promise<IMap> {
    const newMap = await this.mapService.update(mapId, remainingMap);
    const currentMap = await this.mapService.find(mapId, [
      'mapMarkers',
      'mapMarkerConnections',
    ]);
    newMap.mapMarkers = await this.updateEntities<IMap, MapMarker>(
      currentMap,
      currentMap.mapMarkers,
      mapMarkers,
      this.mapMarkerService
    );
    newMap.mapMarkerConnections = await this.updateEntities<
      IMap,
      MapMarkerConnection
    >(
      currentMap,
      currentMap.mapMarkerConnections,
      mapMarkerConnections,
      this.mapMarkerConnectionService
    );
    return newMap;
  }

  private updateEntities<T extends ID, K extends ID>(
    parent: T,
    oldEntities: K[],
    newEntities: K[],
    service: Service<T, K>
  ): Promise<K[]> {
    const map = new Map(oldEntities.map((e) => [e.id, e]));
    const wasChanged = (e: K) =>
      JSON.stringify(map.get(e.id)) !== JSON.stringify(e);
    const alreadyExists = (e: K) => map.get(e.id) !== undefined;
    return Promise.all(
      newEntities.map((e) =>
        alreadyExists(e)
          ? wasChanged(e)
            ? service.update(e.id, e)
            : e
          : service.create(parent, e)
      )
    );
  }
}
