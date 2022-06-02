import { Component } from '@angular/core';

@Component({
  selector: 'dnd-history-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  toggleState: { [key: string]: boolean } = {
    placePinPoint: false,
    movePinPoint: false,
    connectPinPoints: false,
    toggleAllCheckBoxes: false,
  };

  checkBoxState: { [key: string]: boolean } = {
    layer1: true,
    layer2: true,
    layer3: true,
    layer4: true,
    layer5: true,
  };

  getCheckBoxKeyList() {
    return Object.keys(this.checkBoxState);
  }

  constructor() {}

  handleChange(event: any) {
    //
  }

  toggleAllCheckBoxes(event: { checked: boolean; originalEvent: MouseEvent }) {
    Object.keys(this.checkBoxState).forEach(
      (key) => (this.checkBoxState[key] = !event.checked)
    );
  }

  checkBoxToggled(checked: boolean, layer: number) {
    this.checkBoxState[`layer${layer}`] = checked;
    this.toggleState['toggleAllCheckBoxes'] = Object.values(
      this.checkBoxState
    ).every((v) => !v);
  }
}
