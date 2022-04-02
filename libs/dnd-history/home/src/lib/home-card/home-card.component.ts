import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dnd-history-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  constructor() {
    console.log('constructor')
  }

  ngOnInit(): void {
    console.log('init');
  }
}
