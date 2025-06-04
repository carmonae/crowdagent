import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { PiqueI } from '@app/models/pique-model';
import { legendData } from '@app/models/ratings';
import { Usertitle } from '@app/models/user-titles';
import { FeatherIconsComponent } from '@app/shared/component/feather-icons/feather-icons.component';
import {
  RatingHistogramComponent,
  baseHistogramOptions,
} from '@app/shared/component/rating-histogram/rating-histogram.component';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';
import { PiquesService } from '@app/shared/services/piques.service';
import { TitlesService } from '@app/shared/services/titles.service';
import { getValuesByKey } from '@app/util/utils.general.util';
import { getDatabase, ref, set } from 'firebase/database';
import { AuthService } from 'src/app/auth/service/auth.keycloak.service';
import { ProjectStatus } from 'src/app/models/projectStatus';
import { UserprojectI } from 'src/app/models/user-project';
import { ChartOptions } from 'src/app/shared/data/charts/charts/apex-chart';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    FeatherIconsComponent,
    RouterLink,
    RatingHistogramComponent,
  ],
})
export class ReviewListComponent implements OnInit {
  active = 1;
  public openTab: string = 'All';
  public showTheGraph: boolean = false;

  lifeCycle = {
    Title: ['Toc'],
    ToC: ['Synopsis'],
    Synopsis: ['Manuscript'],
  };

  private db = getDatabase();

  // Data
  public piqueListData: PiqueI[] = [];
  public projectListData: UserprojectI[] = [];
  filterData: UserprojectI[] = this.projectListData;
  private uid: string | undefined;
  public histogram!: Partial<ChartOptions> | undefined;
  public histogramLabel = 'Show Rating Histogram';

  constructor(
    private authService: AuthService,
    private projectService: ProjectsService,
    private titleService: TitlesService,
    private piqueService: PiquesService,
    private router: Router
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit(): void {
    this.histogram = baseHistogramOptions;

    var _this = this;
    this.piqueService.getPiques(this.uid!).subscribe({
      next(piques) {
        console.log('piques', piques);
        _this.piqueListData = piques;
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        _this.piqueListData.forEach((pique) => {
          _this.projectService
            .getProjects(pique.userUid!, pique.projectUid)
            .subscribe({
              next(project) {
                console.log('found project:', project);
                _this.projectListData.push(project[0]);
              },
              error(msg) {
                console.log(msg);
              },
              complete() {
                console.log('getProjects finished');
              },
            });
        });
      },
    });

    console.log(this.lifeCycle);
  }

  showHistogram(projId: string): void {
    this.showTheGraph = false;
    if (this.level(projId) === 'manuscript') {
      var pique = this.piqueListData.find((p) => p.projectUid === projId);
      var project = this.projectListData.find((p) => p.projectUid === projId);

      var data: number[] = [];
      var _this = this;

      // Initialize histogram with 20 bins (1-20)
      const histogram = new Array(20).fill(0);
      this.projectService
        .getProjectRatings(pique?.userUid, project?.projectUid!)
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
            _this.showTheGraph = true;
          },
        });
    }
  }

  updateHistogram(data: any[], projId: string): void {
    let histtitle =
      'Title: ' +
      this.piqueListData.find((p) => p.projectUid === projId)!.title +
      ' - ' +
      this.piqueListData.find((p) => p.projectUid === projId)!.subtitle;

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

  level(projId: string): string {
    let pique = this.piqueListData.find(
      (pique) => pique['projectUid'] == projId
    );
    if (pique) {
      return pique.level;
    } else {
      return '';
    }
  }

  yourPersonalRating(projId: string): string {
    var result: string = '';
    if (this.level(projId) !== 'manuscript') {
      result = 'Not Rated';
    } else {
      let pique = this.piqueListData.find(
        (pique) => pique['projectUid'] == projId
      );
      if (pique) {
        result = pique.rating.personalRating + '';
      } else {
        result = 'Not Avail';
      }
    }
    return result;
  }
  yourPredictedRating(projId: string): string {
    var result: string = '';
    if (this.level(projId) !== 'manuscript') {
      result = 'Not Rated';
    } else {
      let pique = this.piqueListData.find(
        (pique) => pique['projectUid'] == projId
      );
      if (pique) {
        result = pique.rating.predictedRating + '';
      } else {
        result = 'Not Avail';
      }
    }
    return result;
  }
  yourBet(projId: string): string {
    var result: string = '';
    if (this.level(projId) !== 'manuscript') {
      result = 'Not Rated';
    } else {
      let pique = this.piqueListData.find(
        (pique) => pique['projectUid'] == projId
      );
      if (pique) {
        result = pique.rating.bet + '';
      } else {
        result = 'Not Avail';
      }
    }
    return result;
  }

  //Filter data
  tabbed(val: string) {
    this.openTab = val;
    this.filterTheData();
    this.showTheGraph = false;
  }

  filterTheData(): void {
    this.filterData =
      this.openTab !== 'All'
        ? this.projectListData.filter((data: UserprojectI) => {
            return this.level(data.projectUid!) == this.openTab.toLowerCase()
              ? true
              : false;
          })
        : this.projectListData;
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
      //data.status != ProjectStatus.DRAFT &&
      choice != ProjectStatus.PUBLISHED
    ) {
      this.titleService.remove(data.projectUid!);
    }
  }

  saveProject(project: UserprojectI): void {
    // upload the manuscript and get the url as a reference, and save the project
    const projectRef = ref(
      this.db,
      `users/project/${this.uid}/${project.projectUid}`
    );
    set(projectRef, project);

    if (project.status == ProjectStatus.PUBLISHED) {
      const newTitle = new Usertitle(project, this.uid);
      console.log(project, newTitle);
      const titleRef = ref(this.db, `titles/${project.projectUid}`);
      set(titleRef, newTitle);
    }
  }
}
