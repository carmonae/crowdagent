import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

import { SortableDirective } from 'src/app/shared/directive/sortable.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonDataTableComponent } from '../../shared/component/common-data-table/common-data-table.component';
import { UserModule } from '../user/user.module';
import { AgentsComponent } from './agents/agents.component';
import { AuthorsComponent } from './authors/authors.component';
import { BestSellingProductComponent } from './authors/best-selling-product/best-selling-product.component';
import { CountsComponent } from './authors/counts/counts.component';
import { ReadSummaryComponent } from './authors/read-summary/read-summary.component';
import { TrackOrderComponent } from './authors/track-order/track-order.component';
import { WeeklyVisitorsComponent } from './authors/weekly-visitors/weekly-visitors.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDefaultComponent } from './default/default.component';
import { ReadersComponent } from './readers/readers.component';
import { CommonDetailsComponent } from './shared/common-details/common-details.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    NgApexchartsModule,
    UserModule,
    DashboardDefaultComponent,
    AuthorsComponent,
    ReadersComponent,
    AgentsComponent,
    WeeklyVisitorsComponent,
    BestSellingProductComponent,
    ReadSummaryComponent,
    TrackOrderComponent,
    CommonDetailsComponent,
    SortableDirective,
    CommonDataTableComponent,
    CountsComponent,
    RouterModule,
  ],
  exports: [],
  declarations: [],
})
export class DashboardModule {}
