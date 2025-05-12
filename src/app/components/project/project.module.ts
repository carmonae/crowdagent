import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProjectListComponent } from './project-list/project-list.component';
import { CreateNewProjectComponent } from './create-new-project/create-new-project.component';
import { UploadFileComponent } from './create-new-project/upload-file/upload-file.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProjectRoutingModule,
        NgxDropzoneModule,
        SharedModule,
        ProjectListComponent,
        CreateNewProjectComponent,
        UploadFileComponent
    ]
})
export class ProjectModule { }
