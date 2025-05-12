import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LandingRoutingModule } from './landing-routing.module';



@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        SharedModule,
        HomeComponent,

    ],
    declarations: [
    ],
    exports: [
        HomeComponent
    ],
})
export class LandingModule { }
