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
import { PrintComponent } from './details/print/print.component';
import { TagProjectComponent } from './modal/tag-project/tag-project.component';
import { PdfModalComponent } from './modal/pdf-modal/pdf-modal.component';


@NgModule({
    imports: [
        CommonModule,
        ContactRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPrintModule,
        ContactComponent,
        SidemenuComponent,
        AllContactComponent,
        DetailsComponent,
        AddCategoryComponent,
        PrintComponent,
        TagProjectComponent,
        PdfModalComponent
    ],
    providers: [
        NgbActiveModal
    ]
})
export class ContactModule { }
