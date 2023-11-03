import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexAxisChartSeries;
  chart?: ApexChart;
  legend?: ApexLegend;
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
  title?: ApexTitleSubtitle;
  xaxis?: ApexXAxis | ApexXAxis[];
  yaxis?: ApexYAxis | ApexYAxis[];
  responsive?: ApexResponsive[];
  tooltip?: any;
}

export interface productStatus{
  icon : string;
  counter : string;
  name : string;
  font : string;
  pr : string;
  tradingIcon : string;
}

// Currency Chart Function (for Bitcoin, Ethereum, Leave-Travel)
function widgetCommonOption(data: any) {
  return {
    series: [{
      data: data.widgetYseries
    }],
    chart: {
      width: 100,
      height: 120,
      type: 'line',
      toolbar: {
        show: false
      },
      offsetY: -15,
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 6,
        left: 0,
        blur: 6,
        color: data.dropshadowColor,
        opacity: 0.3
      }
    },
    grid: {
      show: false
    },
    colors: data.color,
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    labels: data.label,
    markers: {
      size: 0
    },
    xaxis: {
      // type: 'datetime',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      marker: {
        show: false,
      },
      x: {
        show: false,
      },
      y: {
        show: false,
        labels: {
          show: false
        }
      },
    },
    responsive: [
      {
        breakpoint: 1790,
        options: {
          chart: {
            width: 100,
            height: 100,
          }
        }
      },
      {
        breakpoint: 1661,
        options: {
          chart: {
            width: "100%",
            height: 100,
          }
        }
      },
    ],
    icon: data.icon,
    coinName: data.coinName,
    tag: data.tag,
    colorClass: data.colorClass,
    price: data.price,
    parsonage: data.parsonage
  }
}

//Bitcoin
const widget1 = {
  color: ["#31322D"],
  dropshadowColor: "#31322D",
  label: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov'],
  widgetYseries: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  icon: "beta",
  coinName: "Bitcoin",
  tag: "BTC",
  colorClass: "dark",
  price: "21,43",
  parsonage: "50",
};
export const bitcoinChart: ChartOptions | any = widgetCommonOption(widget1);

//Ethereum
const widget2 = {
  color: ["var(--theme-default)"],
  dropshadowColor: "var(--theme-default)",
  label: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep'],
  widgetYseries: [30, 25, 30, 25, 64, 40, 59, 52, 64],
  icon: "eth",
  coinName: "Ethereum",
  tag: "ETC",
  colorClass: "primary",
  price: "7,450",
  parsonage: "35",
};
export const ethereumChart: ChartOptions | any = widgetCommonOption(widget2);

//Leave Travel
const widget3 = {
  color: ["#FF6150"],
  dropshadowColor: "#FF6150",
  label: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul',
    'aug', 'sep', 'oct'],
  widgetYseries: [30, 25, 36, 30, 64, 50, 45, 62, 60, 64],
  icon: "ltc",
  coinName: "Leave Travel",
  tag: "LTC",
  colorClass: "success",
  price: "2,198",
  parsonage: "73",
};
export const leavetravelChart: ChartOptions | any = widgetCommonOption(widget3);


// radial chart js
function radialCommonOption(data : any) {
  return {
    series: data.radialYseries,
    chart: {
      height: 130,
      type: 'radialBar',
      dropShadow: {
        enabled: true,
        top: 3,
        left: 0,
        blur: 10,
        color: data.dropshadowColor,
        opacity: 0.35
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        track: {
          strokeWidth: '60%',
          opacity: 1,
          margin: 5,
        },
        dataLabels: {
          showOn: "always",
          value: {
            color: "var(--body-font-color)",
            fontSize: "14px",
            show: true,
            offsetY: -10,
          }
        }
      },
    },
    colors: data.color,
    stroke: {
      lineCap: "round",
    },
    responsive: [
      {
        breakpoint: 1500,
        options: {
          chart: {
            height: 130,
          }
        }
      },
    ],
    averageTitle: data.averageTitle,
    average: data.average,
    parsonage: data.parsonage,
    desc: data.desc,
    cardColor: data.cardColor,

    // Social Media
    name: data.name,
    image: data.image,
    pr: data.pr,
    followers: data.followers
  }
}

// Avarage Sales Per Day
const radial1 = {
  color: ['#31322D'],
  dropshadowColor: "#31322D",
  radialYseries: [70],
  averageTitle: "Average Sales Per Day",
  average: "45,908",
  parsonage: "5.7",
  desc: "The point of using Lorem Ipsum",
  cardColor: "primary",
};
export const AvarageSalesPerDayChart: ChartOptions | any = radialCommonOption(radial1)

// Avarage Profit Per day
const radial2 = {
  color: ["var(--theme-secondary)"],
  dropshadowColor: "var(--theme-secondary)",
  radialYseries: [60],
  averageTitle: "Average Profit Per Day",
  average: "89.6%",
  parsonage: "2.7",
  desc: "The point of using Lorem Ipsum",
  cardColor: "secondary",
};
export const AvarageProfitPerDayChart: ChartOptions | any = radialCommonOption(radial2);

//Purchase Data
export let purchase : productStatus = {
  icon: "cart",
  counter: "10,000",
  name: "Purchase",
  font: "secondary",
  pr: "+50",
  tradingIcon: 'icon-arrow-up',
};

//Sales Data
export let sales : productStatus = {
  icon: "tag",
  counter: "4,200",
  name: "Sales",
  font: "primary",
  pr: "+70",
  tradingIcon: 'icon-arrow-up',
};

//Sales Return data
export let salesReturn : productStatus = {
  icon: "return-box",
  counter: "7000",
  name: "Sales return",
  font: "warning",
  pr: "-20",
  tradingIcon: 'icon-arrow-down',
};

//Prechase Rate Data
export let purchaseRate : productStatus = {
  icon: "rate",
  counter: "5700",
  name: "Purchase rate",
  font: "success",
  pr: "+70",
  tradingIcon: 'icon-arrow-up',
};

export interface socialMedia{
    color: string[];
    dropshadowColor: string;
    radialYseries: number[];
    name: string;
    image: string;
    pr: string;
    followers: string;
}
// Facebook
const radial3 : socialMedia = {
  color: ["var(--theme-default)"],
  dropshadowColor: "var(--theme-default)",
  radialYseries: [78],
  name: "Facebook",
  image: "assets/images/dashboard/social/1.png",
  pr: "22.9",
  followers: "12,098"
};
export const FacebookChart: ChartOptions | any  = radialCommonOption(radial3);

//Twitter
const radial4 : socialMedia = {
  color: ["#31322D"],
  dropshadowColor: "#31322D",
  radialYseries: [50],
  name: "Twitter",
  image: "assets/images/dashboard/social/3.png",
  pr: "14.09",
  followers: "12,564"
};
export const TwitterChart: ChartOptions | any = radialCommonOption(radial4);

//Instagram
const radial5 : socialMedia = {
  color: ["#FFA941"],
  dropshadowColor: "#FFA941",
  radialYseries: [70],
  name: "Instagram",
  image: "assets/images/dashboard/social/2.png",
  pr: "27.4",
  followers: "15,080"
};
export const InstagramChart: ChartOptions | any = radialCommonOption(radial5);

//Youtube
const radial6 : socialMedia= {
  color: ["#f1523d"],
  dropshadowColor: "#f1523d",
  radialYseries: [80],
  name: "Youtube",
  image: "assets/images/dashboard/social/4.png",
  pr: "22.9",
  followers: "68,954"
};
export const YoutubeChart: ChartOptions | any = radialCommonOption(radial6);

//Growth Chart
export const GrowthChart: ChartOptions | any = {
  series: [{
    name: 'Growth',
    data: [10, 5, 15, 0, 15, 12, 29, 29, 29, 12, 15, 5]
  }],
  chart: {
    height: 135,
    type: 'line',
    toolbar: {
      show: false
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 5,
      left: 0,
      blur: 4,
      color: '#33BFBF',
      opacity: 0.22
    },
  },
  grid: {
    yaxis: {
      lines: {
        show: false
      }
    },
  },
  colors: ["#C1E9C1"],
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    tickAmount: 10,
    labels: {
      style: {
        fontFamily: 'Rubik, sans-serif',
      },
    },
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    tooltip: {
      enabled: false,
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#33BFBF'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      colorStops: [
        {
          offset: 0,
          color: "#33BFBF",
          opacity: 1
        },
        {
          offset: 100,
          color: "#FF6150",
          opacity: 1
        },
      ]
      // stops: [0, 100, 100, 100]
    },
  },
  yaxis: {
    min: -10,
    max: 40,
    labels: {
      show: false
    }
  },
  responsive: [
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 150,
        }
      },
    },
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 180,
        }
      },
    }
  ]
}

//Visitors Chart
export const VisitorsChart: ChartOptions | any = {
  series: [{
    name: 'Active',
    data: [18, 10, 65, 18, 28, 10]
  }, {
    name: 'Bounce',
    data: [25, 50, 30, 30, 25, 45]
  }],
  chart: {
    type: 'bar',
    height: 270,
    toolbar: {
      show: false
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 6,
    colors: ['transparent']
  },
  grid: {
    show: true,
    borderColor: 'var(--chart-border)',
    xaxis: {
      lines: {
        show: true
      }
    },
  },
  colors: ["#33BFBF", "#FF6150"],
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    tickAmount: 4,
    tickPlacement: 'between',
    labels: {
      style: {
        fontFamily: 'Rubik, sans-serif',
      },
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5,
    tickPlacement: 'between',
    labels: {
      style: {
        fontFamily: 'Rubik, sans-serif',
      }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: "Rubik, sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    labels: {
      colors: "var(--chart-text-color)",
    },
    markers: {
      width: 6,
      height: 6,
      radius: 12,
    },
    itemMargin: {
      horizontal: 10,
    }
  },
  responsive: [{
    breakpoint: 1366,
    options: {
      plotOptions: {
        bar: {
          columnWidth: '80%',
        },
      },
      grid: {
        padding: {
          right: 0,
        }
      }
    },
  },
  {
    breakpoint: 1200,
    options: {
      plotOptions: {
        bar: {
          columnWidth: '50%',
        },
      },
      grid: {
        padding: {
          right: 0,
        }
      }
    },
  },
  {
    breakpoint: 576,
    options: {
      plotOptions: {
        bar: {
          columnWidth: '60%',
        },
      },
      grid: {
        padding: {
          right: 5,
        }
      }
    },
  }
  ]
}

//Profit Chart
export const ProfitChart: ChartOptions | any = {
  series: [{
    name: "Desktops",
    data: [210, 180, 650, 200, 600, 100, 800, 300, 500]
  }],
  chart: {
    width: 200,
    height: 150,
    type: 'line',
    offsetY: -24,
    toolbar: {
      show: false
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 5,
      left: 0,
      blur: 3,
      color: '#31322D',
      opacity: 0.3
    },
    zoom: {
      enabled: false
    }
  },
  colors: ["#31322D"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 2,
    curve: 'smooth'
  },
  grid: {
    show: false
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      show: false,
    },
    z: {
      show: false,
    },
    marker: {
      show: false
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  responsive: [{
    breakpoint: 1780,
    options: {
      chart: {
        width: 180,
      }
    },
  },
  {
    breakpoint: 1680,
    options: {
      chart: {
        width: 160,
      }
    },
  },
  {
    breakpoint: 1601,
    options: {
      chart: {
        height: 110,
      }
    },
  },
  {
    breakpoint: 1560,
    options: {
      chart: {
        width: 140,
      }
    },
  },
  {
    breakpoint: 1460,
    options: {
      chart: {
        width: 120,
      }
    },
  },
  {
    breakpoint: 1400,
    options: {
      chart: {
        width: 150,
      }
    },
  },
  {
    breakpoint: 1110,
    options: {
      chart: {
        width: 200,
      }
    },
  },
  {
    breakpoint: 700,
    options: {
      chart: {
        width: 150,
      }
    },
  },
  {
    breakpoint: 576,
    options: {
      chart: {
        width: 220,
      }
    },
  },
  {
    breakpoint: 420,
    options: {
      chart: {
        width: 150,
      }
    },
  },
  ]
}

//Order Chart
export const OrderChart: ChartOptions | any = {
  series: [{
    name: 'Daily',
    data: [2.15, 3, 1.5, 2, 2.4, 3, 2.4,
      2.8, 1.5, 1.7, 3, 2.50, 3, 2, 2.15, 3, 1.10
    ]
  },
  {
    name: 'Weekly',
    data: [-2.15, -3, -1.5, -2, -2.4, -3, -2.4,
    -2.8, -1.5, -1.7, -3, -2.50, -3, -2, -2.15, -3, -1.10
    ]
  },
  {
    name: 'Monthly',
    data: [-2.25, -2.35, -2.45, -2.55, -2.65, -2.75, -2.85,
    -2.95, -3.00, -3.10, -3.20, -3.25, -3.10, -3.00, -2.95, -2.85, -2.75
    ]
  },
  {
    name: 'Yearly',
    data: [2.25, 2.35, 2.45, 2.55, 2.65, 2.75, 2.85,
      2.95, 3.00, 3.10, 3.20, 3.25, 3.10, 3.00, 2.95, 2.85, 2.75
    ]
  }
  ],
  chart: {
    type: 'bar',
    width: 180,
    height: 120,
    stacked: true,
    offsetY: -13,
    toolbar: {
      show: false
    },
  },
  plotOptions: {
    bar: {
      vertical: true,
      columnWidth: '40%',
      barHeight: '80%',
      startingShape: 'rounded',
      endingShape: 'rounded'
    },
  },
  colors: ["#FF6150", "#FF6150", "#F2F3F7", "#F2F3F7"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0,
  },
  legend: {
    show: false,
  },
  grid: {
    xaxis: {
      offsetX: -2,
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    },
  },
  yaxis: {
    min: -5,
    max: 5,
    show: false,
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },

  },
  tooltip: {
    shared: false,
    x: {
      show: false,
    },
    y: {
      show: false,
    },
    z: {
      show: false,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ],
    offsetX: 0,
    offsetY: 0,
    labels: {
      offsetX: 0,
      offsetY: 0,
      show: false
    },
    axisBorder: {
      offsetX: 0,
      offsetY: 0,
      show: false
    },
    axisTicks: {
      offsetX: 0,
      offsetY: 0,
      show: false
    }

  },
  responsive: [{
    breakpoint: 1760,
    options: {
      chart: {
        width: 160,
      }
    },
  },
  {
    breakpoint: 1601,
    options: {
      chart: {
        height: 110,
      }
    },
  },
  {
    breakpoint: 1560,
    options: {
      chart: {
        width: 140,
      }
    },
  },
  {
    breakpoint: 1460,
    options: {
      chart: {
        width: 120,
      }
    },
  },
  {
    breakpoint: 1400,
    options: {
      chart: {
        width: 150,
      }
    },
  },
  {
    breakpoint: 1110,
    options: {
      chart: {
        width: 200,
      }
    },
  },
  {
    breakpoint: 700,
    options: {
      chart: {
        width: 150,
      }
    },
  },
  {
    breakpoint: 576,
    options: {
      chart: {
        width: 220,
      }
    },
  },
  {
    breakpoint: 420,
    options: {
      chart: {
        width: 150,
      }
    },
  },
  ]
}