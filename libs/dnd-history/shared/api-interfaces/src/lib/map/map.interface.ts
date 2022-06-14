import { Id } from '../id.interface';
import { MapMarkerConnection } from './map-marker-connection.inteface';
import { MapMarker } from './map-marker.interface';

export interface Map extends MapDTO, Id {}

export interface MapDTO {
  src: string;
  mapMarkers: MapMarker[];
  mapMarkerConnections: MapMarkerConnection[];
}
