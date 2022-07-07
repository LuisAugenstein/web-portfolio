import { NanoId } from "./id.interface";

export type Selectable = LoadedSelectable | LoadingSelectable;
 
export interface LoadedSelectable {
    loaded: true;
    id: NanoId | undefined;
}

export interface LoadingSelectable {
    loaded: false;
    id: undefined;
}