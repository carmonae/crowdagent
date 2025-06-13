import { Component, Input, OnInit } from '@angular/core';
import { UserprojectI } from '@app/models/user-project';
import { AuthService } from '@app/services/auth.service';
import { WeeklyVisitor } from '@app/shared/data/charts/dashboard-charts';
import { ProjectsService } from '@app/shared/services/projects.service';
import { NgApexchartsModule } from 'ng-apexcharts';

const enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

@Component({
  selector: 'app-weekly-visitors',
  templateUrl: './weekly-visitors.component.html',
  styleUrls: ['./weekly-visitors.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule],
})
export class WeeklyVisitorsComponent implements OnInit {
  private _projectListData!: UserprojectI[] | null;

  @Input() uid: string | undefined = '';
  @Input()
  set projectListData(list: UserprojectI[] | null) {
    this._projectListData = list;
    this.getWeeklyCounts();
  }

  //public radialChart!: Partial<ChartOptions>;
  public radialChart = WeeklyVisitor;
  public isShow: boolean = false;
  public prevDisabled: boolean = true;
  public nextDisabled: boolean = true;
  public weekToShow: number = 1; // this week

  constructor(
    private projectsService: ProjectsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.radialChart);
  }

  getWeeklyCounts() {
    // Initialize histogram with 5 bins (Sunday - Saturday)
    let histogram = new Array(7).fill(0);

    var dates: Date[] = [];
    let today: Date = new Date();

    if (!this._projectListData) return;

    for (let project of this._projectListData!) {
      if (project.ratings) {
        dates = [];
        for (const key in project.ratings) {
          let newDate = new Date(project.ratings[key].timestamp);
          dates.push(newDate);
        }

        dates.forEach((value) => {
          // Calculate bin index (0-based, floor to nearest integer)
          let howLongAgo = Math.floor(
            (today.getTime() - value.getTime()) / (1000 * 3600 * 24)
          );
          let dayofweek = value.getDay();

          //console.log(value, howLongAgo, dayofweek);
          // Keep track if within last seven days
          if (
            howLongAgo > (this.weekToShow - 1) * 7 &&
            howLongAgo <= this.weekToShow * 7
          ) {
            histogram[dayofweek]++;
          }
        });
      }
    }
    let min = Math.min(...histogram);
    let max = Math.max(...histogram);
    let avg =
      histogram.reduce((sum, current) => sum + current, 0) / histogram.length;
    //console.log('getweeklhCounts.histogram', histogram);
    this.radialChart = {
      ...this.radialChart,
      ...{
        series: [
          {
            name: 'Visitors',
            data: histogram,
          },
        ],
        title: {
          text: `Min=${min}; Max=${max}; Avg=${avg.toFixed(2)}`,
          align: 'center',
          offsetY: 272,
          style: {
            fontSize: '16px',
            fontWeight: '400',
            fontFamily: 'Secular One',
            color: '#1F2F3E',
          },
        },
      },
    };
  }

  changeWeek(week: number) {
    this.isShow = !this.isShow;
    if (week >= 1 && week <= 4) {
      this.weekToShow = week;
    }
    this.getWeeklyCounts();
  }

  prev() {
    this.changeWeek(this.weekToShow - 1);
  }
  next() {
    this.changeWeek(this.weekToShow + 1);
  }
}
