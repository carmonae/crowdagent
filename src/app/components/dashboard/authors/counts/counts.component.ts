import { Component, Input } from '@angular/core';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { UserprojectI } from '@app/models/user-project';
import { ProjectsService } from '@app/shared/services/projects.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/data/charts/charts/apex-chart';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule],
})
export class CountsComponent {
  primary = localStorage.getItem('--theme-default') || '#33BFBF';
  secondary = localStorage.getItem('--theme-secondary') || '#ff6150';

  public basicBarChart!: Partial<ChartOptions>;

  uid: string | undefined;
  public _projectListData: UserprojectI[] | null = [];
  @Input()
  set projectListData(list: UserprojectI[] | null) {
    this._projectListData = list;
    this.getChartData();
  }

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit(): void {
    this.basicBarChart = {
      chart: {
        height: 250,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      series: [
        {
          name: 'Counts',
          data: [],
        },
      ],
      xaxis: {
        categories: ['Impressions', 'Title', 'Table of Contents', 'Synopsis'],
      },
      colors: [this.primary],
    };

    /*
    var _this = this;
    this.projectsService.getProjects(this.uid).subscribe({
      next(projects) {
        _this._projectListData = projects;
        _this.getChartData();
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('getProjects finished');
      },
    });
    */
  }

  getChartData(): void {
    console.log('getChartData:', this._projectListData);
    let impressions: number = this._projectListData!.filter(
      (proj) => proj.scoreI
    ).reduce((sum, current) => sum + current.scoreI, 0);
    let titles: number = this._projectListData!.filter(
      (proj) => proj.scoreI
    ).reduce((sum, current) => sum + current.scoreT, 0);
    let toc: number = this._projectListData!.filter(
      (proj) => proj.scoreI
    ).reduce((sum, current) => sum + current.scoreC, 0);
    let abstract: number = this._projectListData!.filter(
      (proj) => proj.scoreI
    ).reduce((sum, current) => sum + current.scoreA, 0);

    this.basicBarChart = {
      ...this.basicBarChart,
      ...{
        series: [
          {
            data: [impressions, titles, toc, abstract],
          },
        ],
      },
    };

    console.log(this.basicBarChart);
  }
}
