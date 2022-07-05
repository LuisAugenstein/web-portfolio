import { ID } from "../id.interface";

export interface Adventure extends AdventureDTO, ID {
    lastChangedAt: Date;
}

export interface AdventureDTO {
    title: string;
    content: string;
}