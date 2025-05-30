import { Component } from '@angular/core';
import {
  abstractPiquesData,
  manuscriptsPiquesData,
  titleImpressionsData,
  titlePiquesData,
} from 'src/app/shared/data/data/default-dashboard/default-dashboard';
import { TrackOrderComponent } from './track-order/track-order.component';

import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { UserprojectI } from '@app/models/user-project';
import { ProjectsService } from '@app/shared/services/projects.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { CommonDetailsComponent } from './common-details/common-details.component';
import { CountsComponent } from './counts/counts.component';
import { CurrentBalanceComponent } from './current-balance/current-balance.component';
import { ProfileGrettingComponent } from './profile-gretting/profile-gretting.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { WeeklyVisitorsComponent } from './weekly-visitors/weekly-visitors.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  standalone: true,
  imports: [
    TrackOrderComponent,
    ProfileGrettingComponent,
    SalesSummaryComponent,
    BestSellingProductComponent,
    CommonDetailsComponent,
    WeeklyVisitorsComponent,
    CurrentBalanceComponent,
    CountsComponent,
    NgApexchartsModule,
  ],
})
export class AuthorsComponent {
  public totalImpressionsData = titleImpressionsData;
  public totalAbstractData = abstractPiquesData;
  public totalManuscriptData = manuscriptsPiquesData;
  public totalTitleData = titlePiquesData;

  private uid: string | undefined;
  public projectListData: UserprojectI[] = [];

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService
  ) {
    this.uid = authService.getUid();
  }

  ngOnInit() {
    var _this = this;
    this.projectsService.getProjects(this.uid).subscribe({
      next(projects) {
        _this.projectListData = projects;
        _this.getData();
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        console.log('getProjects finished');
      },
    });
  }

  getData() {
    //TODO : allow user to define the goals...currently hardcoded

    console.log('getChartData:', this.projectListData);
    let impressions: number = this.projectListData
      .filter((proj) => proj.scoreI)
      .reduce((sum, current) => sum + current.scoreI, 0);
    this.totalImpressionsData.data = impressions.toString();
    this.totalImpressionsData.progress =
      Math.floor((impressions * 100) / 1000).toString() + '%';

    let scoreT: number = this.projectListData
      .filter((proj) => proj.scoreI)
      .reduce((sum, current) => sum + current.scoreT, 0);
    this.totalTitleData.data = scoreT.toString();
    this.totalTitleData.progress =
      Math.floor((scoreT * 100) / 100).toString() + '%';

    let scoreA: number = this.projectListData
      .filter((proj) => proj.scoreI)
      .reduce((sum, current) => sum + current.scoreA, 0);
    this.totalAbstractData.data = scoreA.toString();
    this.totalAbstractData.progress =
      Math.floor((scoreA * 100) / 100).toString() + '%';

    this.totalManuscriptData.data = this.projectListData
      .filter((proj) => proj.scoreI)
      .reduce((sum, current) => sum + current.scoreM, 0)
      .toString();
  }
}
