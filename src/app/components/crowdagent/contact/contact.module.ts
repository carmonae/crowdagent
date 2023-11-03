import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ContactComponent } from './contact.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AllContactComponent } from './all-contact/all-contact.component';
import { DetailsComponent } from './details/details.component';
import { AddCategoryComponent } from './modal/add-category/add-category.component';
import { NewContactComponent } from './modal/new-contact/new-contact.component';
import { GeneralComponent } from './details/edit-form/general/general.component';
import { PersonalDetailsComponent } from './details/edit-form/personal-details/personal-details.component';
import { AddressDetailsComponent } from './details/edit-form/address-details/address-details.component';
import { PrintComponent } from './details/print/print.component';
import 'hammerjs';
import 'mousetrap';


@NgModule({
  declarations: [
    ContactComponent,
    SidemenuComponent,
    AllContactComponent,
    DetailsComponent,
    AddCategoryComponent,
    NewContactComponent,
    GeneralComponent,
    PersonalDetailsComponent,
    AddressDetailsComponent,
    PrintComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  providers: [
    NgbActiveModal
  ]
})
export class ContactModule { }
