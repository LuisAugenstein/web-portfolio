import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dnd-history-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  session = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.session = this.route.snapshot.params['session']
  }

  routeTo(name: string){
    console.log(name);
  }
}
