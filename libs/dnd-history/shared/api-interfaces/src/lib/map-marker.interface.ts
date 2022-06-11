import { ID } from './id.interface';

export interface MapMarker extends MapMarkerDTO, ID {}

export interface MapMarkerDTO {
  name: string;
  description: string;
  x: number;
  y: number;
}
