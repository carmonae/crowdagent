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
  @Input() uid: string | undefined = '';
  @Input() projectListData: UserprojectI[] = [];

  //public radialChart!: Partial<ChartOptions>;
  public radialChart = WeeklyVisitor;
  //public projectListData: UserprojectI[] = [];

  constructor(
    private projectsService: ProjectsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.radialChart);
    /*
    var _this = this;
    this.projectsService.getProjects(this.uid).subscribe({
      next(projects) {
        _this.projectListData = projects;
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('weekly-visitors.radialChart before=', _this.radialChart);
        _this.getWeeklyCounts();
        console.log('weekly-visitors.radialChart after=', _this.radialChart);
        console.log('getProjects finished');
      },
    });
    */
  }

  getWeeklyCounts() {
    // Initialize histogram with 5 bins (Sunday - Saturday)
    let histogram = new Array(7).fill(0);
    var dates: Date[] = [];

    let today: Date = new Date();
    for (let project of this.projectListData) {
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
          console.log(value, howLongAgo, dayofweek);
          // Keep track if within last seven days
          if (howLongAgo < 7) {
            histogram[dayofweek]++;
          }
        });
      }
    }
    console.log('getweeklhCounts.histogram', histogram);
    this.radialChart = {
      ...this.radialChart,
      ...{
        series: [
          {
            name: '',
            data: histogram,
          },
        ],
      },
    };
  }
}
