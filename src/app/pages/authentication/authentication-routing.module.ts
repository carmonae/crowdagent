import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSimpleComponent } from './login-simple/login-simple.component';
import { LoginBgImageComponent } from './login-bg-image/login-bg-image.component';
import { LoginWithTwoImageComponent } from './login-with-two-image/login-with-two-image.component';
import { LoginValidationComponent } from './login-validation/login-validation.component';
import { LoginTooltipComponent } from './login-tooltip/login-tooltip.component';
import { LoginSweetalert2Component } from './login-sweetalert2/login-sweetalert2.component';
import { RegisterSimpleComponent } from './register-simple/register-simple.component';
import { RegisterBgImageComponent } from './register-bg-image/register-bg-image.component';
import { RegisterWithTwoImageComponent } from './register-with-two-image/register-with-two-image.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  {
    path : '',
    children : [
      {
        path : 'simple',
        component : LoginSimpleComponent,
      },
      { 
        path : 'image-one',
        component : LoginBgImageComponent
      },
      {
        path : 'image-two',
        component : LoginWithTwoImageComponent
      },
      {
        path : 'validation',
        component : LoginValidationComponent
      },
      {
        path : 'tooltip',
        component : LoginTooltipComponent
      },
      {
        path : 'login-sweetalert',
        component : LoginSweetalert2Component
      },
      {
        path : 'register-simple',
        component : RegisterSimpleComponent
      },
      {
        path : 'register-image-one',
        component : RegisterBgImageComponent
      },
      {
        path : 'register-image-two',
        component : RegisterWithTwoImageComponent
      },
      {
        path : 'unlock-user',
        component : UnlockUserComponent
      },
      { 
        path : 'forgot-password', 
        component : ForgotPasswordComponent
      },
      {
        path : 'reset-password',
        component : ResetPasswordComponent
      },
      {
        path : 'maintenance',
        component : MaintenanceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
