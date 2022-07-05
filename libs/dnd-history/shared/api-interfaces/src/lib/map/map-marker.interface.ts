import { ID } from '../id.interface';

export interface MapMarker extends MapMarkerDTO, ID {}

export interface MapMarkerDTO {
  title: string;
  description: string;
  x: number;
  y: number;
}
