import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  adventures: string[] = [];

  selectedAdventure?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.adventures = ['Avernus', 'Marlon/Michi', 'Noah Oneshot'];
    console.log('access database and get possible adventures');
  }
}
