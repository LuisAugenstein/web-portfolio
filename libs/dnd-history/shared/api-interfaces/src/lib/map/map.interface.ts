import { MapMarkerConnection } from './map-marker-connection.inteface';
import { MapMarker } from './map-marker.interface';

export interface Map {
  id: string;
  src: string;
  mapMarkers: MapMarker[];
  mapMarkerConnections: MapMarkerConnection[];
}
