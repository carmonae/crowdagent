import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { UserEditComponent } from './user-edit/user-edit.component';
import { MyProfileComponent } from './user-edit/my-profile/my-profile.component';
import { EditProfileComponent } from './user-edit/edit-profile/edit-profile.component';
import { ProjectsComponent } from './user-edit/projects/projects.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        UserRoutingModule,
        UserEditComponent,
        MyProfileComponent,
        EditProfileComponent,
        ProjectsComponent
    ],
    exports: [
        ProjectsComponent
    ]
})
export class UserModule { }
