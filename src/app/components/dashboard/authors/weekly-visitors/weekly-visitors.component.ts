import { Component, OnInit } from '@angular/core';
import * as Chart from '../../../../shared/data/charts/dashboard-charts'

@Component({
  selector: 'app-weekly-visitors',
  templateUrl: './weekly-visitors.component.html',
  styleUrls: ['./weekly-visitors.component.scss']
})
export class WeeklyVisitorsComponent implements OnInit {

  public salesChart = Chart.WeeklyVisitor
  constructor() { }

  ngOnInit(): void {
  }
}
