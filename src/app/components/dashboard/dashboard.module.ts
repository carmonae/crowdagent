import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import { SharedModule } from 'src/app/shared/shared.module';
import { CommonDataTableComponent } from '../../shared/component/common-data-table/common-data-table.component';
import { UserModule } from '../user/user.module';
import { AgentsComponent } from './agents/agents.component';
import { AuthorsComponent } from './authors/authors.component';
import { BestSellingProductComponent } from './authors/best-selling-product/best-selling-product.component';
import { CommonDetailsComponent } from './authors/common-details/common-details.component';
import { CurrentBalanceComponent } from './authors/current-balance/current-balance.component';
import { ProfileGrettingComponent } from './authors/profile-gretting/profile-gretting.component';
import { SalesSummaryComponent } from './authors/sales-summary/sales-summary.component';
import { TrackOrderComponent } from './authors/track-order/track-order.component';
import { WeeklyVisitorsComponent } from './authors/weekly-visitors/weekly-visitors.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReadersComponent } from './readers/readers.component';

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
