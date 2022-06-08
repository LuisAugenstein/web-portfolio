import { Component } from '@angular/core';
import { CheckBox, LayerService } from '../../services/layer.service';
import { PaletteService } from '../../services/toolbar/palette.service';
import { PlacePinPointButton } from '../../services/toolbar/tool-bar-buttons/place-pin-point-button';
import {
  ToggleButton,
  ToolBarButton,
} from '../../services/toolbar/palette.service';

@Component({
  selector: 'dnd-history-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(
    private readonly layerService: LayerService,
    private readonly paletteService: PaletteService,
    placePinPointButton: PlacePinPointButton
  ) {
    paletteService.register(placePinPointButton);
  }

  //============================================
  //== Manage toggleButtons of the palette =====
  //============================================

  getToolBarButtons(): ToolBarButton[] {
    return this.paletteService.getToolBarButtons();
  }

  onToolBarButtonChange(event: { checked: boolean }, toggleButtonId: number) {
    this.paletteService.toggleToolBarButton(event.checked, toggleButtonId);
  }

  //=======================================================
  //== Manage CheckBoxes for showing different layers =====
  //=======================================================

  getCheckBoxes(): CheckBox[] {
    return this.layerService.getCheckBoxes();
  }

  getToggleAllLayersButton(): ToggleButton {
    return this.layerService.getToggleAllLayersButton();
  }

  toggleAllLayers(event: { checked: boolean }) {
    this.layerService.toggleAllLayers(event.checked);
  }

  toggleSingleLayer(active: boolean, layer: number) {
    this.layerService.toggleSingleLayer(active, layer);
  }
}
