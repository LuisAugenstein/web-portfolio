import { ID } from '../id.interface';

export interface MapMarkerConnection extends MapMarkerConnectionDTO, ID {}

export interface MapMarkerConnectionDTO {
  layer: number;
  sourceMapMarkerId: number;
  destinationMapMarkerId: number;
}
