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
let white = '#fff'
var darkcolor = '#31322D';
var lightcolor = "#F1F8F1"

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
}


//Weekly Visitor Chart For Default Dashboard
export const WeeklyVisitor: ChartOptions | any = {
  series: [{
    name: 'Average : 26,546 ',
    data: [20, 120, 40, 30, 65, 120, 44],
  }],
  chart: {
    height: 300,
    type: 'radar',
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: true,
  },
  plotOptions: {
    radar: {
      size: 110,
      offsetY: -20,
      polygons: {
        strokeColor: "#e9e9e9",
        fill: {
          colors: [lightcolor, "#fff"]
        }
      },
      dataLabels: {
        name: {
          show: true,
        }
      },
    }
  },
  title: {
    text: "Average : 26,546",
    align: "center",
    offsetY: 272,
    style: {
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: 'Secular One',
      color: '#1F2F3E'
    },
  },
  labels: ['Average : 26,546 '],
  colors: [darkcolor],
  markers: {
    size: 5,
    colors: ['#fff'],
    strokeColor: darkcolor,
    strokeWidth: 3,
  },
  xaxis: {
    categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  yaxis: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 1446,
      options: {
        plotOptions: {
          radar: {
            size: 90,
          }
        },
      }
    },
    {
      breakpoint: 1334,
      options: {
        plotOptions: {
          radar: {
            size: 70,
          }
        },
      }
    },
    {
      breakpoint: 1200,
      options: {
        plotOptions: {
          radar: {
            size: 110,
          }
        },
      }
    },
    {
      breakpoint: 405,
      options: {
        plotOptions: {
          radar: {
            size: 90,
          }
        },
      }
    },
    {
      breakpoint: 360,
      options: {
        plotOptions: {
          radar: {
            size: 68,
          }
        },
      }
    },
  ],
};

// ==================================================

//Sales Summary Chart For Default Dashboard
function generateData(baseval: number, count: number, yrange: { min: any; max: any; }) {
  var i = 0;
  var series = [];
  while (i < count) {
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
    series.push([baseval, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}
export const SalesSummary: ChartOptions | any = {
  chart: {
    height: 400,
    type: "bubble",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "Product1",
      data: generateData(new Date("01 Jan 2023 GMT").getTime(), 20, {
        min: 10,
        max: 55,
      }),
    },
    {
      name: "Product2",
      data: generateData(new Date("01 Jan 2023 GMT").getTime(), 20, {
        min: 10,
        max: 55,
      }),
    },
    {
      name: "Product3",
      data: generateData(new Date("01 Jan 2023 GMT").getTime(), 20, {
        min: 10,
        max: 55,
      }),
    },
    {
      name: "Product4",
      data: generateData(new Date("01 Jan 2023 GMT").getTime(), 20, {
        min: 10,
        max: 55,
      }),
    },
  ],
  fill: {
    type: "gradient",
  },
  legend: {
    show: false,
  },
  xaxis: {
    tickAmount: 12,
    type: "datetime",
    labels: {
      rotate: 0,
    },
  },
  yaxis: {
    labels: {
      formatter: function (value: string) {
        return value + "K";
      },
      style: {
        colors: [darkcolor],
        fontFamily: "Secular One",
      },
    },
  },
  theme: {
    palette: "palette2",
  },
  colors: ["#1F2F3E", "#C1E9C1", "#1F2F3E", "#C1E9C1"],

}

//========================================================================

// Earning Chart For Ecommerce Dashboard
export const EarningChart: ChartOptions | any = {
  series: [65],
  chart: {
    type: 'radialBar',
    height: 280,
    offsetY: -10,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -120,
      endAngle: 180,
      offsetY: 0,
      hollow: {
        size: '55%',
      },
      track: {
        background: lightcolor,
        strokeWidth: '90%',
        startAngle: 0,
        endAngle: 360,
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        name: {
          show: false,
        },
        value: {
          fontSize: '30px',
          fontFamily: "'Secular One', sans-serif",
          fontWeight: 600,
        },
      },
    },
  },
  colors: [darkcolor],
  grid: {
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  stroke: {
    lineCap: 'round',
  }
}

//========================================================================

//Sales Summary Chart For Ecommerce Dashboard
export const EcommerceSalesSummary: ChartOptions | any = {
  series: [
    {
      name: "Activity",
      data: [4, 5, 5.7, 3, 5, 5.4, 5.8, 4, 4.5, 3, 5],
    },
  ],
  chart: {
    height: 300,
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 3,
      columnWidth: "30%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    labels: {
      style: {
        fontSize: "12px",
        fontFamily: "Rubik, sans-serif",
        colors: "var(--chart-text-color)",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      borderType: 'solid',
    },
    tooltip: {
      enabled: false,
    },
  },
  legend: {
    show: false,
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      formatter: function (val: string) {
        return val + "0" + "k";
      },
      style: {
        fontSize: "14px",
        fontFamily: "Secular One",
        colors: "$black",
      },
    },
  },
  grid: {
    borderColor: "var(--chart-dashed-border)",
  },
  colors: [lightcolor, lightcolor, lightcolor, lightcolor, lightcolor, lightcolor, darkcolor, lightcolor, lightcolor, lightcolor, lightcolor],

}

//========================================================================

//Traffic Chart For Ecommerce Dashboard
export const TrafficChart: ChartOptions | any = {
  series: [
    {
      type: "area",
      data: [50, 70, 65, 80, 40, 50, 48, 60, 48, 50, 70, 80, 75, 50, 60, 50, 50, 10, 30, 20, 70, 65, 95, 45, 70, 50, 80, 75, 90, 60, 65, 50, 70, 65, 50, 55, 50],
    },
  ],
  chart: {
    height: 235,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: [3, 1],
    dashArray: [0, 5],
  },
  annotations: {
    points: [{
      x: 347,
      y: 65,
      marker: {
        size: 8,
        fillColor: darkcolor,
        strokeColor: '#ffffff',
        strokeWidth: 5,
        radius: 2,
      },
    }]
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
  responsive: [
    {
      breakpoint: 1470,
      options: {
        chart: {
          height: 200,
        },
      },
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 200,
        },
      },
    },
  ],
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  xaxis: {
    show: false,
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: true,
      width: 1,
      position: "back",
      stroke: {
        color: darkcolor,
        width: 1,
        dashArray: 5,
      },
    },
  },
  tooltip: {
    marker: {
      show: false,
    },
    fixed: {
      enabled: false,
      position: "bottomRight",
      offsetX: 0,
      offsetY: 0,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  colors: [darkcolor],
}
