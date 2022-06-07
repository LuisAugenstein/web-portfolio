import { Injectable } from '@angular/core';
import { PlacePinPointButton } from './tool-bar-buttons/place-pin-point-button';

export interface ToggleButton {
  toolTip: string;
  onIcon: string;
  offIcon: string;
  active: boolean;
}

export interface ToolBarButton extends ToggleButton {
  name: string;
  deactivate: () => void;
  activate: () => void;
}

@Injectable({ providedIn: 'root' })
export class PaletteService {
  private toolBarButtons: ToolBarButton[] = [
    new PlacePinPointButton(),
    // {
    //   name: 'move-pin-point',
    //   toolTip: 'move a pin point',
    //   onIcon: 'i i-move',
    //   offIcon: 'i i-move',
    //   active: false,
    // },
    // {
    //   name: 'connect-pin-points',
    //   toolTip: 'connect two pin points',
    //   onIcon: 'i i-connect',
    //   offIcon: 'i i-connect',
    //   active: false,
    // },
  ];

  constructor() {}

  getToolBarButtons(): ToolBarButton[] {
    return this.toolBarButtons;
  }

  getToolBarButton(name: string): ToolBarButton | undefined {
    return this.toolBarButtons.find((t) => t.name === name);
  }

  toggleToolBarButton(active: boolean, toolBarButtonId: number) {
    active ? this.activate(toolBarButtonId) : this.deactivate(toolBarButtonId);
  }

  activate(toggleButtonId: number): void {
    this.toolBarButtons.forEach((btn, index) => {
      if (index !== toggleButtonId) {
        btn.deactivate();
      }
    });
    this.toolBarButtons[toggleButtonId].deactivate();
  }

  deactivate(toggleButtonId: number): void {
    this.toolBarButtons[toggleButtonId].deactivate();
  }
}
