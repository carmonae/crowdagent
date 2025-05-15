import { Component } from '@angular/core';
import { abstractPiquesData, manuscriptsPiquesData, titleImpressionsData, titlePiquesData } from 'src/app/shared/data/data/default-dashboard/default-dashboard';
import { TrackOrderComponent } from './track-order/track-order.component';

import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { CommonDetailsComponent } from './common-details/common-details.component';
import { CurrentBalanceComponent } from './current-balance/current-balance.component';
import { ProfileGrettingComponent } from './profile-gretting/profile-gretting.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { WeeklyVisitorsComponent } from './weekly-visitors/weekly-visitors.component';

import { AuthService } from '@app/auth/service/auth.keycloak.service';

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
        CurrentBalanceComponent
        
    ]
})
export class AuthorsComponent {

  public totalImpressionsData = titleImpressionsData;
  public totalOrderData = abstractPiquesData;
  public totalProductsData = manuscriptsPiquesData;
  public totalUserData = titlePiquesData;

  private uid: string | undefined;

  constructor(private authService: AuthService) {
    // Get the uuid of the account from the authentication service
    this.uid = this.authService.getUid();
  }
}
