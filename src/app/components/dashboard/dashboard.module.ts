import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import { UserModule } from '../user/user.module';
import { AuthorsComponent } from './authors/authors.component';
import { ReadersComponent } from './readers/readers.component';
import { AgentsComponent } from './agents/agents.component';
import { ProfileGrettingComponent } from './authors/profile-gretting/profile-gretting.component';
import { CurrentBalanceComponent } from './authors/current-balance/current-balance.component';
import { WeeklyVisitorsComponent } from './authors/weekly-visitors/weekly-visitors.component';
import { BestSellingProductComponent } from './authors/best-selling-product/best-selling-product.component';
import { SalesSummaryComponent } from './authors/sales-summary/sales-summary.component';
import { TrackOrderComponent } from './authors/track-order/track-order.component';
import { CommonDetailsComponent } from './authors/common-details/common-details.component';
import { CommonDataTableComponent } from './authors/common-data-table/common-data-table.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SortableDirective } from 'src/app/shared/directive/sortable.directive';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        FormsModule,
        NgApexchartsModule,
        UserModule,
        AuthorsComponent,
        ReadersComponent,
        AgentsComponent,
        ProfileGrettingComponent,
        CurrentBalanceComponent,
        WeeklyVisitorsComponent,
        BestSellingProductComponent,
        SalesSummaryComponent,
        TrackOrderComponent,
        CommonDetailsComponent,
        SortableDirective,
        CommonDataTableComponent,
    ],
    exports: []
})
export class DashboardModule { }
