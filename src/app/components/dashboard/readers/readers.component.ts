import { Component } from '@angular/core';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { RatingHistogramComponent } from '@app/shared/component/rating-histogram/rating-histogram.component';
import { ProfileGrettingComponent } from '../shared/profile-gretting/profile-gretting.component';
import { CurrentBalanceComponent } from './current-balance/current-balance.component';

import { ChartOptions } from 'src/app/shared/data/charts/charts/apex-chart';

@Component({
  selector: 'app-readers',
  templateUrl: './readers.component.html',
  styleUrls: ['./readers.component.scss'],
  standalone: true,
  imports: [
    ProfileGrettingComponent,
    CurrentBalanceComponent,
    RatingHistogramComponent,
  ],
})
export class ReadersComponent {
  public histogram!: Partial<ChartOptions>;
  public greeting: string =
    'Here’s what’s happening today with the books you have reviewed.';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.histogram = {
      series: [
        {
          name: '',
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val + '%';
          },
        },
      },
      title: {
        text: 'Monthly Inflation in Argentina, 2002',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444',
        },
      },
    };
  }
}
