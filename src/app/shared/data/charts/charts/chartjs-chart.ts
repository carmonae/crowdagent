import { ChartType } from "chart.js";

let primary = localStorage.getItem('--theme-default') || '#33BFBF';
let secondary = localStorage.getItem('--theme-secondary') || '#ff6150';


// Bar Chart
export const barChart =
    {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: "rgba(115, 102 ,255, 0.4)",
            borderColor: primary,
            highlightBackgroundColor : "rgba(115, 102 ,255, 0.6)",
            borderWidth: 2,
            highlightBorderColor: primary,
            data: [35, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            backgroundColor: "rgba(247, 49, 100, 0.4)",
            borderColor : secondary,
            highlightBackgroundColor : "rgba(247, 49, 100, 0.6)",
            borderWidth: 2,
            highlightBorderColor : secondary,
            data: [28, 48, 40, 19, 86, 27, 90]
        }],
        barOptions : [
            {
                scaleBeginAtZero: true,
                scaleShowGridLines: true,
                scaleGridLineColor: "rgba(0,0,0,0.1)",
                scaleGridLineWidth: 1,
                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: true,
                barShowStroke: true,
                barStrokeWidth: 2,
                barValueSpacing: 5,
                barDatasetSpacing: 1,
            }
        ]
}

// Line Graph Data
export var lineGraphLabels: string[] = ["January", "February", "March", "April", "May", "June", "July"];
export var lineGraphType : ChartType = 'line';
export var lineGraphLegend = false;
export var lineGraphData: any[] = [
  {
    label: "My First dataset",
    fill: true,
    backgroundColor: "rgba(115, 102 ,255, 0.3)",
    borderColor: primary,
    pointColor: primary,
    borderWidth: 2,
    pointBorderColor: "#fff",
    pointHighlight : "#fff",
    pointHighlightStroke: "#000",
    data: [10, 59, 80, 81, 56, 55, 40]
}, {
    label: "My Second dataset",
    fill: true,
    backgroundColor: "rgba(247, 49, 100, 0.3)",
    borderColor: secondary,
    pointColor: secondary,
    pointStrokeColor: "#fff",
    borderWidth: 2,
    pointHighlightFill: "#000",
    pointHighlightStroke: secondary,
    data: [28, 48, 40, 19, 86, 27, 90]
}
];
export var lineGraphOptions: any = {
  scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
}

// Radar Graph
export var radarGraphOptions: any = {
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.2)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 3,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };
  export var radarGraphLabels: string[] = ["Ford", "Chevy", "Toyota", "Honda", "Mazda"];
  export var radarGraphType : ChartType= 'radar';
  export var radarGraphLegend = false;
  export var radarGraphData: any[] = [
    {
      label: "My First dataset",
        //   fill: true,
          backgroundColor: "rgba(115, 102 ,255, 0.4)",
          borderColor: primary,
          pointBackgroundColor: primary,
          pointBorderColor: primary,
          pointHoverBackgroundColor: primary,
          pointHoverBorderColor: "rgba(115, 102 ,255, 0.4)",
          data: [12, 3, 5, 18, 7]
    },
];

//  Line Chart
export var barChartOptions: any = {
  pointDotRadius: 2,
  pointDotStrokeWidth: 5,
  pointDotStrokeColor: "#ffffff",
  bezierCurve: false,
  scaleShowVerticalLines: false,
  scaleGridLineColor: "#eeeeee"
  };
  export var barChartLabels: string[] = ["", "10", "20", "30", "40", "50", "60", "70", "80"];
  export var barChartType : ChartType= 'line';
  export var barChartLegend = false;
  export var barChartData: any[] = [
    {
      fillColor: "rgba(81, 187, 37, 0.2)",
      fill: true,
      strokeColor: "#51bb25",
      pointColor: "#51bb25",
      data: [10, 20, 40, 30, 0, 20, 10, 30, 10],
  },{
    fillColor: "rgba(247, 49, 100, 0.2)",
      fill: true,
      strokeColor: secondary,
      pointColor : secondary,
      data: [20, 40, 10, 20, 40, 30, 40, 10, 20],
  }, {
      fillColor: "rgba(115, 102 ,255, 0.2)",
      fill: true,
      strokeColor: primary,
      pointColor : primary,
      data: [60, 10, 40, 30, 80, 30, 20, 90, 0],
  }
  ];

  // Donut Chart

  export var doughnutChartLegend = false;
export var doughnutChartLabels: string[] = ['Red','Blue','Yellow','Green', 'Purple'];
export var doughnutChartData:  any[] = [
  {
    label: 'My First Dataset',
    data: [300, 50, 100],
    height : 374,
    width : 374,
    backgroundColor: [
      primary,
      secondary,
      "#51bb25"
    ]
  }
];
export var doughnutChartColors: any[] = [{ backgroundColor: [primary, secondary, "#51bb25"] }];
export var doughnutChartType  : ChartType = 'doughnut';
export var doughnutChartOptions: any = {
  responsive: true,
    segmentShowStroke: true,
    segmentStrokeColor: "#fff",
    segmentStrokeWidth: 2,
    percentageInnerCutout: 50,
    animationSteps: 100,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

};


// Polar Chart
export var polarChartLabels: string[] = ["Yellow", "Sky", "Black", "Grey", "Dark Grey"];
export var polarChartType : ChartType= 'polarArea';
export var polarChartLegend = false;
export var polarChartOptions: any = {
    scaleShowLabelBackdrop: true,
    scaleBackdropColor: "rgba(255,255,255,0.75)",
    scaleBeginAtZero: true,
    scaleBackdropPaddingY: 2,
    scaleBackdropPaddingX: 2,
    scaleShowLine: true,
    segmentShowStroke: true,
    segmentStrokeColor: "#fff",
    segmentStrokeWidth: 2,
    animationSteps: 100,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
};
export var polarChartColors: any[] = [{ backgroundColor: [primary, secondary] }];
export var polarChartData: any[] = [{
  data: [300, 50, 100, 40, 120],
  backgroundColor : [
    primary ,
    "#f8d62b",
    "#51bb25",
    "#a927f9",
    secondary
  ],
  borderColor : "#fff"
  }
];

