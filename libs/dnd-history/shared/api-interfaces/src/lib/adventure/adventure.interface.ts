import { Id } from "../id.interface";

export interface Adventure extends AdventureDTO, Id {
    lastChangedAt: Date;
}

export interface AdventureDTO {
    title: string;
    content: string;
}