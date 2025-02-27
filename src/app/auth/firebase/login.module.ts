import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component'
import { RegisterSimpleComponent } from './register/register-simple.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { CommonRegisterFormComponent } from './common-register-form/common-register-form.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterSimpleComponent,
    ForgotPasswordComponent,
    CommonRegisterFormComponent
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ],

  exports: [
  ]
})
export class LoginComponentModule { }
