import { NanoId } from "./id.interface";

export interface Selectable {
    id: NanoId | undefined | 'loading';
}