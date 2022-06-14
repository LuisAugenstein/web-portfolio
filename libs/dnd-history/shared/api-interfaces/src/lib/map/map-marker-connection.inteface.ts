import { Id } from '../id.interface';

export interface MapMarkerConnection extends MapMarkerConnectionDTO, Id {}

export interface MapMarkerConnectionDTO {
  layer: number;
  sourceMapMarkerId: number;
  destinationMapMarkerId: number;
}
