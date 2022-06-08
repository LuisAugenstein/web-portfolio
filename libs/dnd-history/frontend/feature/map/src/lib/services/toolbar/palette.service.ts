import { Injectable } from '@angular/core';

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
export abstract class PaletteService {
  private toolBarButtons: ToolBarButton[] = [];

  register(toolbarButton: ToolBarButton) {
    this.toolBarButtons.push(toolbarButton);
  }

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
    this.toolBarButtons[toggleButtonId].activate();
  }

  deactivate(toggleButtonId: number): void {
    this.toolBarButtons[toggleButtonId].deactivate();
  }
}
