import { ID } from "../id.interface";

export interface Character extends ID {
    name: string;
    description: string;
    type: 'Player' | 'NPC' | string;
}