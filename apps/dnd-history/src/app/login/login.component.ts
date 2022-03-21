import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dnd-history-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  adventure = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('access database and get possible adventures'); 
  }

  setAdventure() {
    this.adventure = 'Avernus';
  }
}
