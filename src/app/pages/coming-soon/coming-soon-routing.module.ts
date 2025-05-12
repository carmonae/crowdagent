import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonSimpleComponent } from './coming-soon-simple/coming-soon-simple.component';
import { ComingSoonVideoComponent } from './coming-soon-video/coming-soon-video.component';
import { ComingSoonImageComponent } from './coming-soon-image/coming-soon-image.component';

const routes: Routes = [
  {
    path : '',
    children : [
      {
        path : 'coming-simple',
        component : ComingSoonSimpleComponent
      },
      {
        path : 'coming-with-bg-video',
        component : ComingSoonVideoComponent
      },
      {
        path : 'coming-with-bg-image',
        component : ComingSoonImageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComingSoonRoutingModule { }
