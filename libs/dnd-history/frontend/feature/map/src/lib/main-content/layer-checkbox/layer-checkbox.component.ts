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
  check = true;
  @Output()
  checkChange: EventEmitter<boolean> = new EventEmitter();

  toggle(){
    this.check = !this.check;
    this.emit(this.check);
  }

  emit(check: boolean){
    this.checkChange.emit(check);
  }
}
