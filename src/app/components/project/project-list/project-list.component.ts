import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usertitle } from '@app/models/user-titles';

import { legendData } from '@app/models/ratings';
import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
import {
  baseHistogramOptions,
  RatingHistogramComponent,
} from '@app/shared/component/rating-histogram/rating-histogram.component';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';
import { TitlesService } from '@app/shared/services/titles.service';
import { getValuesByKey } from '@app/util/utils.general.util';
import { getDatabase, ref, set } from 'firebase/database';
import { AuthService } from 'src/app/auth/service/auth.keycloak.service';
import { ProjectStatus } from 'src/app/models/projectStatus';
import { UserprojectI } from 'src/app/models/user-project';
import { ChartOptions } from 'src/app/shared/data/charts/charts/apex-chart';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    FeatherIconsComponent,
    RouterLink,
    RatingHistogramComponent,
  ],
})
export class ProjectListComponent implements OnInit {
  active = 1;
  public openTab: string = 'All';
  public showTheGraph: boolean = false;

  lifeCycle = {
    Draft: ['Published', 'Archived'],
    Published: ['Parked', 'Archived'],
    Parked: ['Published', 'Archived'],
    Archived: [],
  };
  public histogram!: Partial<ChartOptions> | undefined;
  public histogramLabel = 'Show Rating Histogram';

  private db = getDatabase();

  // Data
  public projectListData: UserprojectI[] = [];
  filterData: UserprojectI[] = this.projectListData;
  private uid: string | undefined;

  constructor(
    private authService: AuthService,
    private projectService: ProjectsService,
    private titleService: TitlesService,
    private router: Router
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit(): void {
    this.histogram = baseHistogramOptions;

    var _this = this;
    this.projectService.getProjects(this.uid).subscribe({
      next(projects) {
        console.log('got projects:', projects);
        _this.projectListData = _this.filterData = projects;
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('getProjects finished');
      },
    });

    console.log('lifecycle:', this.lifeCycle);
  }

  //Filter data
  tabbed(val: string) {
    this.openTab = val;
    this.filterTheData();
  }

  filterTheData(): void {
    this.filterData =
      this.openTab !== 'All'
        ? this.projectListData.filter((data: UserprojectI) => {
            return data.status == this.openTab ? true : false;
          })
        : this.projectListData;
  }

  progress(data: any) {
    return Math.min((data.countM / 100) * 100, 100).toString() + '%';
  }

  showHistogram(projId: string): void {
    this.showTheGraph = false;
    var project = this.projectListData.find((p) => p.projectUid === projId);

    var data: number[] = [];
    var _this = this;

    // Initialize histogram with 20 bins (1-20)
    const histogram = new Array(20).fill(0);
    this.projectService
      .getProjectRatings(this.uid, project?.projectUid!)
      .subscribe({
        next(ratings) {
          data = ratings.map((item) => item.predictedRating);
        },
        error(msg) {
          console.log(msg);
        },
        complete() {
          console.log(data);
          // Validate input values
          if (!data.every((val) => val >= 1 && val <= 20)) {
            throw new Error('All values must be between 1 and 20');
          }

          // Count values in each bin
          data.forEach((value) => {
            // Calculate bin index (0-based, floor to nearest integer)
            const binIndex = Math.floor(value) - 1;
            histogram[binIndex]++;
          });
          console.log('histogram', histogram);
          _this.updateHistogram(histogram, projId);
          if (histogram.reduce((sum, value) => sum + value, 0) != 0) {
            _this.showTheGraph = true;
          }
        },
      });
  }

  updateHistogram(data: any[], projId: string): void {
    let histtitle =
      'Title: ' +
      this.projectListData.find((p) => p.projectUid === projId)!.title +
      ' - ' +
      this.projectListData.find((p) => p.projectUid === projId)!.subtitle;

    this.histogram = {
      ...this.histogram,
      ...{
        series: [
          {
            name: '# Readers',
            data: data,
          },
        ],
        title: {
          text: histtitle,
        },
        xaxis: {
          categories: getValuesByKey(legendData, 'designation'),
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
        },
        annotations: {
          xaxis: [
            {
              x: '12',
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                orientation: 'horizontal',
                text: 'Your rating',
              },
            },
          ],
        },
      },
    };
  }

  editProject(data: UserprojectI) {
    console.log('edit project:', data);
    this.router.navigateByUrl('/projects/create-new', { state: data });
  }

  changeStatus(data: UserprojectI, choice: string) {
    //TODO: save change of project status
    //TODO: validate that we have title, abstract, and manuscript
    data.status = choice as ProjectStatus;
    this.saveProject(data);
    this.filterTheData();

    if (
      data.status != ProjectStatus.DRAFT &&
      choice != ProjectStatus.PUBLISHED
    ) {
      this.titleService.remove(data.projectUid!);
    }

    if (data.status === ProjectStatus.PUBLISHED) {
      this.projectService.setPublishingDate(this.uid!, data.projectUid!);

      // Let's add the title to allow people to pique it
      const newTitle = new Usertitle(data, this.uid);
      console.log('add title to allow pique', data, newTitle);
      const titleRef = ref(this.db, `titles/${data.projectUid}`);
      set(titleRef, newTitle);
    }
  }

  saveProject(project: UserprojectI): void {
    // upload the manuscript and get the url as a reference, and save the project
    const projectRef = ref(
      this.db,
      `users/project/${this.uid}/${project.projectUid}`
    );
    set(projectRef, project);
  }
}
