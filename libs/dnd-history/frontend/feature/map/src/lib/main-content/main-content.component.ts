import { Component, Input, OnInit } from '@angular/core';
import { Map } from '@dnd-history/shared-interfaces';

@Component({
  selector: 'dnd-history-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  @Input()
  selectedMap!: Map;

  selectedTool!: any;

  tools = [{
    name: 'create marker',
  }, {
    name: 'move marker',
  }, {
    name: 'connect marker'
  }];

  constructor() {}

  ngOnInit(): void {}
}
