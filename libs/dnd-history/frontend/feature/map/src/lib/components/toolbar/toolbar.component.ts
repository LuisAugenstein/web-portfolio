import { Component } from '@angular/core';

@Component({
  selector: 'dnd-history-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(
    // private readonly paletteService: PaletteService,
    // placeMapMarkerButton: PlaceMapMarkerButton
  ) {
    // paletteService.register(placeMapMarkerButton);
  }

  //============================================
  //== Manage toggleButtons of the palette =====
  //============================================

  getToolBarButtons(): [] {
    return [];
    // return this.paletteService.getToolBarButtons();
  }

  onToolBarButtonChange(event: { checked: boolean }, toggleButtonId: number) {
    // this.paletteService.toggleToolBarButton(event.checked, toggleButtonId);
  }
}
