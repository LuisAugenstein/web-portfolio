export interface PinConnection extends PinConnectionDTO {
    id: number;
}

export interface PinConnectionDTO {
    layer: number; 
    sourcePinPointId: number;
    destinationPinPointId: number;
}