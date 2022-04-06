import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dnd-history-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss'],
})
export class AdventureComponent implements OnInit {
  constructor() {
    console.log('Hallo')
  }

  ngOnInit(): void {
    console.log('Hallo');
  }
}
