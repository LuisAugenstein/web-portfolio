import { ID } from './id.interface';

export interface PinConnection extends PinConnectionDTO, ID {}

export interface PinConnectionDTO {
  layer: number;
  sourcePinPointId: number;
  destinationPinPointId: number;
}
