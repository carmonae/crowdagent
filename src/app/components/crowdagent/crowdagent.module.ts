import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { ContactModule } from './contact/contact.module';
import { CrowdagentRoutingModule } from './crowdagent-routing.module';
import { ListviewComponent } from './listview/listview.component';
import { TitleFilterComponent } from './title-filter/title-filter.component';
@NgModule({
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbModule,
    SharedModule,
    CrowdagentRoutingModule,
    ContactModule,
    FormsModule,
    ListviewComponent,
    TitleFilterComponent,
    SwiperModule,
    CarouselModule,
  ],
  declarations: [],
  schemas: [],
})
export class CrowdagentModule {}
