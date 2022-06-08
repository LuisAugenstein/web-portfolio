import { Injectable } from '@angular/core';
import { ToggleButton } from './toolbar/palette.service';

export interface CheckBox {
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class LayerService {
  private n_layers = 5;
  private checkBoxes: CheckBox[] = [];

  private toggleAllLayersButton: ToggleButton = {
    toolTip: `toggle all layers on or off`,
    onIcon: 'i i-eye-closed',
    offIcon: 'i i-eye-open',
    active: false,
  };

  constructor() {
    for (let i = 0; i < this.n_layers; i++) {
      this.checkBoxes.push({ active: true });
    }
  }

  getCheckBoxes(): CheckBox[] {
    return this.checkBoxes;
  }

  getToggleAllLayersButton(): ToggleButton {
    return this.toggleAllLayersButton;
  }

  toggleAllLayers(active: boolean): void {
    for (const checkBox of this.checkBoxes) {
      checkBox.active = !active;
    }
  }

  toggleSingleLayer(active = true, layer: number): void {
    this.checkBoxes[layer].active = active;
    this.toggleAllLayersButton.active = this.checkBoxes.every((c) => !c.active);
  }
}
