import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }

    ])

  ],

})
export class LandingRoutingModule { }
