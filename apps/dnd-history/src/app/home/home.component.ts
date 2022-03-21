import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dnd-history-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  adventure = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['adventure']);
    this.route.queryParams.subscribe(params => {
      this.adventure = params['adventure'];
    });
  }
}
