import { Component } from '@angular/core';

interface ToggleButton {
  toolTip: string;
  onIcon: string;
  offIcon: string;
  active: boolean;
}

@Component({
  selector: 'dnd-history-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  toggleButtons: { [key: string]: ToggleButton } = {
    placePinPoint: {
      toolTip: 'place a new pin point',
      onIcon: 'i i-marker',
      offIcon: 'i i-marker',
      active: false,
    },
    movePinPoint: {
      toolTip: 'move a pin point',
      onIcon: 'i i-move',
      offIcon: 'i i-move',
      active: false,
    },
    connectPinPoints: {
      toolTip: 'connect two pin points',
      onIcon: 'i i-connect',
      offIcon: 'i i-connect',
      active: false,
    },
    toggleAllLayers: {
      toolTip: `toggle all layers on or off`,
      onIcon: 'i i-eye-closed',
      offIcon: 'i i-eye-open',
      active: false,
    },
  };
  toggleButtonList = Object.values(this.toggleButtons);

  checkBoxes: { [key: string]: { active: boolean } } = {
    layer0: { active: true },
    layer1: { active: true },
    layer2: { active: true },
    layer3: { active: true },
    layer4: { active: true },
  };
  checkBoxList = Object.values(this.checkBoxes);

  constructor() {}

  handleChange(event: any) {
    console.log(event);
  }

  toggleAllLayers(event: { active: boolean; originalEvent: MouseEvent }) {
    for(const checkBox of this.checkBoxList){
      checkBox.active = !event.active;
    }
  }

  onLayerToggled(active: boolean, layer: number) {
    this.checkBoxList[layer].active = active;
    this.toggleButtons['toggleAllLayers'].active = this.checkBoxList.every(
      (checkBox) => !checkBox.active
    );
  }
}
