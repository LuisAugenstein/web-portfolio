import { ID } from './id.interface';

export interface Map extends MapDTO, ID {}

export interface MapDTO {
  src: string;
}
