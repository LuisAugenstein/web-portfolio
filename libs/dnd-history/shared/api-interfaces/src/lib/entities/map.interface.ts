import { ID, NanoId } from '../id.interface';

export interface Map extends ID {
  src: string;
  mapMarkers: MapMarker[];
  mapMarkerConnections: MapMarkerConnection[];
}

export interface MapMarker extends ID {
  title: string;
  description: string;
  x: number;
  y: number;
}

export interface MapMarkerConnection extends ID {
  layer: number;
  sourceMapMarkerId: NanoId;
  destinationMapMarkerId: NanoId;
}
