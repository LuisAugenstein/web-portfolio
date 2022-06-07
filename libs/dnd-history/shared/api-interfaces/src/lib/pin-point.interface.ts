import { ID } from './id.interface';

export interface PinPoint extends PinPointDTO, ID {}

export interface PinPointDTO {
  name: string;
  description: string;
  x: number;
  y: number;
}
