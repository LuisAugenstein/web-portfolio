import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  adventures = ['Avernus', 'Marlon/Michi', 'Noah Oneshot'];

  selectedAdventure?: string;

  constructor(private router: Router) {
    this.adventures = ['Avernus', 'Marlon/Michi', 'Noah Oneshot'];
  }

  ngOnInit(): void {
    console.log('access database and get possible adventures');
  }
}
