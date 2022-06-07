import { ToolBarButton } from '../palette.service';

export class PlacePinPointButton implements ToolBarButton {
  readonly name = 'place-pin-point';
  readonly toolTip = 'place a new pin point';
  readonly onIcon = 'i i-marker';
  readonly offIcon = 'i i-marker';
  active = false;

  constructor() {}

  deactivate(): void {
    console.log(this.active);
    //   this.active = false;
  }
  activate(): void {
    console.log(this.active);
    //   this.active = true;
  }
}
