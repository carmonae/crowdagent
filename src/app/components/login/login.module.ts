import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { LogonComponent } from './logon.component';

import { CommonRegisterFormComponent } from './common-register-form/common-register-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterSimpleComponent } from './register/register-simple.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        RegisterSimpleComponent,
        ForgotPasswordComponent,
        CommonRegisterFormComponent,
        LoginRoutingModule,
        LoginComponent,
        LogonComponent
    ],
    exports: [],
    declarations: [
    ]
})
export class LoginComponentModule { }
