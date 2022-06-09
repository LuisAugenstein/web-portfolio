import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dnd-history-layer-checkbox',
  templateUrl: './layer-checkbox.component.html',
  styleUrls: ['./layer-checkbox.component.scss'],
})
export class LayerCheckboxComponent {
  @Input()
  layer!: number;

  @Input()
  active = true;
  @Output()
  activeChange: EventEmitter<boolean> = new EventEmitter();

  toggle(){
    this.active = !this.active;
    this.emit(this.active);
  }

  emit(active: boolean){
    this.activeChange.emit(active);
  }
}
