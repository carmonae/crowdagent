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
import { ReadSummaryComponent } from './authors/read-summary/read-summary.component';
import { TrackOrderComponent } from './authors/track-order/track-order.component';
import { WeeklyVisitorsComponent } from './authors/weekly-visitors/weekly-visitors.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReadersComponent } from './readers/readers.component';

import { SortableDirective } from 'src/app/shared/directive/sortable.directive';
import { CountsComponent } from './authors/counts/counts.component';

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
    WeeklyVisitorsComponent,
    BestSellingProductComponent,
    ReadSummaryComponent,
    TrackOrderComponent,
    CommonDetailsComponent,
    SortableDirective,
    CommonDataTableComponent,
    CountsComponent,
  ],
  exports: [],
  declarations: [],
})
export class DashboardModule {}
