import { Component, OnInit } from '@angular/core';
import { Map } from '@dnd-history/shared-interfaces';

@Component({
  selector: 'dnd-history-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  selectedMap!: Map;
  
  constructor() {}

  ngOnInit(): void {}
}
