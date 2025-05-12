import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as Chart from '../../../../shared/data/charts/dashboard-charts';


@Component({
    selector: 'app-sales-summary',
    templateUrl: './sales-summary.component.html',
    styleUrls: ['./sales-summary.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class SalesSummaryComponent {

  public salesChart = Chart.SalesSummary

}
