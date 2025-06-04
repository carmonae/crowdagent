import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/data/charts/charts/apex-chart';

export const baseHistogramOptions: Partial<ChartOptions> | undefined = {
  series: [
    {
      name: '# Readers',
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
      colors: {
        ranges: [
          {
            from: 0,
            to: Infinity,
            color: '#33bfbf',
          },
        ],
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + '';
    },
    offsetY: 10,
    style: {
      fontSize: '14px',
      colors: ['#304758'],
    },
  },

  xaxis: {
    categories: [],
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
        return val + '';
      },
    },
  },

  title: {
    text: 'Ratings',
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444',
    },
  },

  annotations: {
    xaxis: [
      {
        x: '',
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          orientation: 'horizontal',
          text: 'Your Rating',
        },
      },
    ],
  },
};

@Component({
  selector: 'app-rating-histogram',
  templateUrl: './rating-histogram.component.html',
  styleUrls: ['./rating-histogram.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
})
export class RatingHistogramComponent {
  @ViewChild('histchart') barchart!: ChartComponent;

  @Input('histogram') histogram: Partial<ChartOptions> = {};

  primary = localStorage.getItem('--theme-default') || '#33BFBF';
  secondary = localStorage.getItem('--theme-secondary') || '#ff6150';

  public chartLabel: string = 'Ratings';

  constructor() {}

  ngOnInit(): void {
    if (this.histogram.title?.text) {
      this.chartLabel = this.histogram.title?.text;
    }
  }
}
