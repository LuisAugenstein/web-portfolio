export interface PinPoint extends PinPointDTO{
  id: number;
}

export interface PinPointDTO {
  name: string;
  description: string;
  x: number;
  y: number;
}