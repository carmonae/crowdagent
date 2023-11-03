import { Component } from '@angular/core';
import * as Chart from '../../../../shared/data/charts/dashboard-charts'


@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.scss']
})
export class SalesSummaryComponent {

  public salesChart = Chart.SalesSummary

}
