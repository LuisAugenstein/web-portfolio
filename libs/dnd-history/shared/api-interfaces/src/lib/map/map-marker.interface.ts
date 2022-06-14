import { Id } from '../id.interface';

export interface MapMarker extends MapMarkerDTO, Id {}

export interface MapMarkerDTO {
  name: string;
  description: string;
  x: number;
  y: number;
}
