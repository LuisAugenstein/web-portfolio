import { ID } from './id.interface';

export interface Session extends SessionDTO, ID {}

export interface SessionDTO {
  name: string;
}
