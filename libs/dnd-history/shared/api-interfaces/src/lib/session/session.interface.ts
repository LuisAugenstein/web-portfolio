import { Id } from '../id.interface';

export interface Session extends SessionDTO, Id {}

export interface SessionDTO {
  name: string;
}
