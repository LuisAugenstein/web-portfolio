import { ID } from "../id.interface";

export interface Adventure extends ID {
    title: string;
    content: string;
    createdAt: Date;
}