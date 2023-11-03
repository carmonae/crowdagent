import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

import { CrowdagentRoutingModule } from './crowdagent-routing.module';
import { ListviewComponent } from './listview/listview.component';
import { TitleFilterComponent } from './title-filter/title-filter.component';
import { ContactModule } from './contact/contact.module';


@NgModule({
  declarations: [
    ListviewComponent,
    TitleFilterComponent,

  ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbModule,
    SharedModule,
    CrowdagentRoutingModule,
    ContactModule
  ]
})
export class CrowdagentModule { }
