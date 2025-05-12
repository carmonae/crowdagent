import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonRoutingModule } from './coming-soon-routing.module';
import { ComingSoonSimpleComponent } from './coming-soon-simple/coming-soon-simple.component';
import { ComingSoonVideoComponent } from './coming-soon-video/coming-soon-video.component';
import { ComingSoonImageComponent } from './coming-soon-image/coming-soon-image.component';


@NgModule({
  declarations: [
    ComingSoonSimpleComponent,
    ComingSoonVideoComponent,
    ComingSoonImageComponent
  ],
  imports: [
    CommonModule,
    ComingSoonRoutingModule
  ]
})
export class ComingSoonModule { }
