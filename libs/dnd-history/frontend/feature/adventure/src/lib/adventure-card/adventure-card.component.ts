import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'dnd-history-adventure-card',
  templateUrl: './adventure-card.component.html',
  styleUrls: ['./adventure-card.component.scss'],
})
export class AdventureCardComponent {
  @Input()
  title = '';
  @Input()
  createdAt = new Date();
  @Input()
  content = '';
  @Input()
  selected = false;
  @Output()
  update = new EventEmitter();
  @Output()
  cardClicked = new EventEmitter();

  constructor(public datePipe: DatePipe) {}

  onCardClicked() {
    this.cardClicked.emit();
  }

  isActive() {
    return this.selected && this.content.split('').length > 30;
  }

  onUpdateButtonClicked(event: Event) {
    event.stopPropagation();
    this.update.emit();
  }
}
