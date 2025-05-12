import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
      '../../../assets/crowdagent.webflow/css/webflow.css',
      '../../../assets/crowdagent.webflow/css/crowdagent.webflow.css',
      '../../../assets/crowdagent.webflow/css/normalize.css'],
    standalone: true,
    imports: [RouterLink]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
