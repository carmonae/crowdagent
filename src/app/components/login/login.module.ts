import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';

import { CommonRegisterFormComponent } from './common-register-form/common-register-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterSimpleComponent } from './register/register-simple.component';

@NgModule({
  declarations: [
    RegisterSimpleComponent,
    ForgotPasswordComponent,
    CommonRegisterFormComponent,
    LoginComponent
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    LoginRoutingModule,
  ],

  exports: [
  ]
})
export class LoginComponentModule { }
