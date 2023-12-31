import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { UserEditComponent } from './user-edit/user-edit.component';
import { MyProfileComponent } from './user-edit/my-profile/my-profile.component';
import { EditProfileComponent } from './user-edit/edit-profile/edit-profile.component';
import { ProjectsComponent } from './user-edit/projects/projects.component';

import { AuthService } from '../../auth/service/auth.service'

@NgModule({
  declarations: [
    UserEditComponent,
    MyProfileComponent,
    EditProfileComponent,
    ProjectsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    ProjectsComponent
  ]
})
export class UserModule { }
